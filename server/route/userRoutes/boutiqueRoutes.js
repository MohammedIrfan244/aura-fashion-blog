import express from "express";
import {
  getAllBoutiqueBanners,
  getBoutiqueByCategory,
  getBoutiqueById,
} from "../../controller/userControllers/boutiqueController.js";
import verifyToken from "../../middlewares/verfiyToken.js";
import idValidation from "../../middlewares/idValidation.js";
import tryCatch from "../../utilities/tryCatch.js";

const route = express.Router();

route
  .get("/all-boutique-banners", verifyToken, tryCatch(getAllBoutiqueBanners))
  .get("/get-boutique-by-category", verifyToken, tryCatch(getBoutiqueByCategory))
  .get("/get-boutique-by-id/:id",verifyToken, idValidation, tryCatch(getBoutiqueById));

export default route;
