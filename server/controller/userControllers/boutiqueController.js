import BoutiqueCategory from "../../model/boutiqueCategoryModel.js";
import Boutique from "../../model/boutiqueModel.js";
import CustomError from "../../utilities/CustomError.js";


const getAllBoutiqueBanners = async (req, res, next) => {
    const banners = await BoutiqueCategory.find({},{banner:1,name:1,title:1});
    if (!banners) {
        return next(new CustomError("Boutique bannners not found", 404));
    }
    res.status(200).json({ banners, message: "Boutique bannners fetched successfully" });
};

const getBoutiqueByCategory = async (req, res, next) => {
    const { category } = req.query;
    if (!category) {
        return next(new CustomError("Please provide category", 400));
    }
    const boutique = await Boutique.find({ category: category },{name:1,category:1,firstImage:1,price:1});
    if (!boutique) {
        return next(new CustomError("Boutique not found", 404));
    }
    res.status(200).json({ boutique, message: "Boutique fetched successfully" });
}

const getBoutiqueById = async (req, res, next) => {
    const { id } = req.params;
    const boutique = await Boutique.findById(id);
    if (!boutique) {
        return next(new CustomError("Boutique not found", 404));
    }
    res.status(200).json({ boutique, message: "Boutique fetched successfully" });
}


export {getAllBoutiqueBanners , getBoutiqueByCategory, getBoutiqueById};