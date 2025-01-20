import express from "express";
import {
  getAllBoutiqueBanners,
  getBoutiqueByCategory,
} from "../../controller/userControllers/boutiqueController.js";
import verifyToken from "../../middlewares/verfiyToken.js";

const route = express.Router();

route
  .get("/all-boutique-banners", verifyToken, getAllBoutiqueBanners)
  .get("/get-boutique-by-category", verifyToken, getBoutiqueByCategory);

export default route;
