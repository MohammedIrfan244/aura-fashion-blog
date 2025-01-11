import BoutiqueCategory from "../models/boutiqueCategoryModel.js";
import StyleCategory from "../models/styleCategoryModel.js";
import CustomError from "../utilities/CustomError.js";

const getAllBoutiqueCategories = async(req,res,next)=>{
    const categories= await BoutiqueCategory.find({},{name:1,image:1})
    if(!categories) {
        return next(new CustomError("Boutique categories not found", 404));
    }
    res.status(200).json({categories,message:"Categories fetched successfully"});
}

const getAllBoutiqueBanners = async(req,res,next)=>{
    const categories= await BoutiqueCategory.find({},{banner:1})
    if(!categories) {
        return next(new CustomError("Boutique categories not found", 404));
    }
    res.status(200).json({categories,message:"Categories fetched successfully"});
}

const getAllStyleCategories = async(req,res,next)=>{
    const categories= await StyleCategory.find()
    if(!categories) {
        return next(new CustomError("Style categories not found", 404));
    }
    res.status(200).json({categories,message:"Categories fetched successfully"});
}

export {getAllBoutiqueCategories,getAllStyleCategories,getAllBoutiqueBanners}