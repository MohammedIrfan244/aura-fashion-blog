import Style from "../../model/styleModel.js";
import StyleLike from "../../model/styleLikeModel.js";
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
            req.id,
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
  if (!style) {
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

export { getStyleByCategory, getOneStyle, likeStyle };
