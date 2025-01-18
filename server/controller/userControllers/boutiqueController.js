import BoutiqueCategory from "../../model/boutiqueCategoryModel.js";
import CustomError from "../../utilities/CustomError.js";


const getAllBoutiqueBanners = async (req, res, next) => {
    const banners = await BoutiqueCategory.find({},{banner:1,name:1,title:1});
    if (!banners) {
        return next(new CustomError("Boutique bannners not found", 404));
    }
    res.status(200).json({ banners, message: "Boutique bannners fetched successfully" });
};



export {getAllBoutiqueBanners};