import StyleCategory from "../../models/styleCategoryModel.js";
import Style from "../../models/styleModel.js";
import CustomError from "../../utilities/CustomError.js";

const addNewStyleCategory = async (req, res,next) => {
    const { name, image } = req.body;
    if(!name || !image) {
        return next(new CustomError("Please provide name and image", 400));
    }
    const newStyleCategory = new StyleCategory({ name, image });
    await newStyleCategory.save();
    res.status(201).json({ message: "Style category added successfully" });
};

const removeStyleCategory = async (req, res, next) => {
  const { id } = req.params;
  const styleCategory = await StyleCategory.findById(id);
  if (!styleCategory) {
    return next(new CustomError("Style category not found", 404));
  }
  await Style.deleteMany({ category: styleCategory.name });
  await StyleCategory.findByIdAndDelete(id);
  res.status(200).json({ message: "Style category removed successfully" });
};


export { addNewStyleCategory, removeStyleCategory };