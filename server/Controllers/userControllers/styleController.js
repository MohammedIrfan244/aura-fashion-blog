import Style from "../../models/styleModel.js";
import CustomError from "../../utilities/CustomError.js";

const getStyleByCategory = async (req, res, next) => {
  const { category } = req.query;
  if (!category) {
    return next(new CustomError("Please provide category", 400));
  }
  if (category === "all") {
    const styles = await Style.find(
      {},
      {
        styleName: 1,
        category: 1,
        styleImage: 1,
        styleAuthor: 1,
        styleDescription: 1,
      }
    );
    if (!styles) {
      return next(new CustomError("Styles not found", 404));
    }
    res.status(200).json({ styles, message: "Styles fetched successfully" });
  }
  const styles = await Style.find(
    { category: category },
    {
      styleName: 1,
      category: 1,
      styleImage: 1,
      styleAuthor: 1,
      styleDescription: 1,
    }
  );
  if (!styles) {
    return next(new CustomError("Styles not found", 404));
  }
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

export { getStyleByCategory , getOneStyle};
