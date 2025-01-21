import BoutiqueCategory from "../model/boutiqueCategoryModel.js";
import Boutique from "../model/boutiqueModel.js";
import StyleCategory from "../model/styleCategoryModel.js";
import CustomError from "../utilities/CustomError.js";

const getAllBoutiqueCategories = async (req, res, next) => {
  const categories = await BoutiqueCategory.find(
    {},
    { name: 1, image: 1, title: 1 }
  );
  if (!categories) {
    return next(new CustomError("Boutique categories not found", 404));
  }
  res
    .status(200)
    .json({ categories, message: "Categories fetched successfully" });
};

const getAllBoutiqueBadges = async (req, res, next) => {
  const categories = await BoutiqueCategory.find({}, { badge: 1 });
  if (!categories) {
    return next(new CustomError("Boutique categories not found", 404));
  }
  res
    .status(200)
    .json({ categories, message: "Categories fetched successfully" });
};

const getAllStyleCategories = async (req, res, next) => {
  const categories = await StyleCategory.find();
  if (!categories) {
    return next(new CustomError("Style categories not found", 404));
  }
  res
    .status(200)
    .json({ categories, message: "Categories fetched successfully" });
};

export {
  getAllBoutiqueCategories,
  getAllStyleCategories,
  getAllBoutiqueBadges,
};
