import Style from "../../model/styleModel.js";
import StyleLike from "../../model/styleLikeModel.js";
import CustomError from "../../utilities/CustomError.js";

const getStyleByCategory = async (req, res, next) => {
  const { category } = req.query;

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
      $project: {
        name: 1,
        category: 1,
        description: 1,
        image: 1,
        author: 1,
        likeCount: { $size: "$likes" },
      },
    },
  ]);

  if (!styles || styles.length === 0) {
    return next(new CustomError("Styles not found", 404));
  }
  console.log(styles);
  res.status(200).json({ styles, message: "Styles fetched successfully" });
};

const getOneStyle = async (req, res, next) => {
  const { id } = req.params;
  const style = await Style.findById(id);
  if (!style) {
    return next(new CustomError("Style not found", 404));
  }
  res.status(200).json({ style, message: "Style fetched successfully" });
};

export { getStyleByCategory, getOneStyle };
