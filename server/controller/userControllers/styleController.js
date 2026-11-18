import Style from "../../model/styleModel.js";
import StyleLike from "../../model/styleLikeModel.js";
import StyleComment from "../../model/styleCommentModel.js";
import StyleCategory from "../../model/styleCategoryModel.js";
import User from "../../model/usersModel.js";
import CustomError from "../../utilities/CustomError.js";
import mongoose from "mongoose";

const getStyleByCategory = async (req, res, next) => {
  const { category } = req.query;
  const userId = req.user.id;

  const styles = await Style.aggregate([
    {
      $match: { category },
    },
    {
      $lookup: {
        from: "stylelikes",
        localField: "_id",
        foreignField: "style",
        as: "likes",
      },
    },
    {
      $addFields: {
        isLiked: {
          $in: [
            new mongoose.Schema.Types.ObjectId(userId),
            {
              $map: {
                input: "$likes",
                as: "like",
                in: "$$like.user",
              },
            },
          ],
        },
        likeCount: { $size: "$likes" },
      },
    },
    {
      $project: {
        name: 1,
        category: 1,
        description: 1,
        image: 1,
        author: 1,
        likeCount: 1,
        isLiked: 1,
      },
    },
  ]);

  if (!styles || styles.length === 0) {
    return next(new CustomError("Styles not found", 404));
  }

  res.status(200).json({ styles, message: "Styles fetched successfully" });
};

const getOneStyle = async (req, res, next) => {
  const { id } = req.params;
  const style = await Style.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "stylelikes",
        localField: "_id",
        foreignField: "style",
        as: "likes",
      },
    },
    {
      $addFields: {
        isLiked: {
          $in: [
            new mongoose.Types.ObjectId(req.user.id),
            {
              $map: {
                input: "$likes",
                as: "like",
                in: "$$like.user",
              },
            },
          ],
        },
        likeCount: { $size: "$likes" },
      },
    },
    {
      $project: {
        name: 1,
        category: 1,
        description: 1,
        image: 1,
        author: 1,
        likeCount: 1,
        isLiked: 1,
        content: 1,
      },
    },
  ]);

  if (!style || style.length === 0) {
    return next(new CustomError("Style not found", 404));
  }

  res
    .status(200)
    .json({ style: style[0], message: "Style fetched successfully" });
};

const likeStyle = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const style = await Style.findById(id);
  if (!style) {
    return next(new CustomError("Style not found", 404));
  }
  const styleLike = await StyleLike.findOne({ user: userId, style: id });
  if (styleLike) {
    await StyleLike.deleteOne({ user: userId, style: id });
  } else {
    const newStyleLike = new StyleLike({ user: userId, style: id });
    await newStyleLike.save();
  }
  res.status(200).json({ message: "Style liked successfully" });
};

const createStyle = async (req, res, next) => {
  let { name, category, description, author, content, image } = req.body;

  if (req.uploadedFile?.secure_url) {
    image = req.uploadedFile.secure_url;
  }

  if (!name || !category || !description || !image) {
    return next(new CustomError("Name, category, description and image are required", 400));
  }

  // Author defaults to user username if not supplied
  if (!author) {
    const user = await User.findById(req.user.id);
    author = user ? user.username : "Anonymous";
  }

  // Parse content if string
  let parsedContent = [];
  if (typeof content === "string") {
    try {
      parsedContent = JSON.parse(content);
    } catch {
      parsedContent = [{ contentTitle: name, contentDetails: content }];
    }
  } else if (Array.isArray(content)) {
    parsedContent = content;
  }

  if (!parsedContent || parsedContent.length === 0) {
    parsedContent = [{ contentTitle: "Introduction", contentDetails: description }];
  }

  const categorySlug = category.toLowerCase().trim();

  const newStyle = new Style({
    name: name.trim(),
    category: categorySlug,
    description: description.trim(),
    image: image.trim(),
    author: author.trim(),
    content: parsedContent,
  });

  await newStyle.save();

  // Ensure category exists in StyleCategory collection
  const existingCategory = await StyleCategory.findOne({ name: categorySlug });
  if (!existingCategory) {
    await StyleCategory.create({
      name: categorySlug,
      title: category.trim(),
      image: image.trim(),
    });
  }

  res.status(201).json({ style: newStyle, message: "Blog style created successfully" });
};

const addStyleComment = async (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment || !comment.trim()) {
    return next(new CustomError("Comment cannot be empty", 400));
  }

  const style = await Style.findById(id);
  if (!style) {
    return next(new CustomError("Style not found", 404));
  }

  const newComment = new StyleComment({
    user: req.user.id,
    style: id,
    comment: comment.trim(),
  });

  await newComment.save();
  await newComment.populate("user", "username profile");

  res.status(201).json({ comment: newComment, message: "Comment added successfully" });
};

const getStyleComments = async (req, res, next) => {
  const { id } = req.params;

  const comments = await StyleComment.find({ style: id })
    .populate("user", "username profile")
    .sort({ createdAt: -1 });

  res.status(200).json({ comments, message: "Comments fetched successfully" });
};

const deleteStyleComment = async (req, res, next) => {
  const { id } = req.params;
  const comment = await StyleComment.findById(id);
  if (!comment) {
    return next(new CustomError("Comment not found", 404));
  }

  if (comment.user.toString() !== req.user.id) {
    return next(new CustomError("You are not authorized to delete this comment", 403));
  }

  await StyleComment.findByIdAndDelete(id);
  res.status(200).json({ message: "Comment deleted successfully" });
};

export {
  getStyleByCategory,
  getOneStyle,
  likeStyle,
  createStyle,
  addStyleComment,
  getStyleComments,
  deleteStyleComment,
};
