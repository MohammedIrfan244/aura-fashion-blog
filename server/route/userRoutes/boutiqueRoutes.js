import express from "express";
import {getAllBoutiqueBanners} from '../../controller/userControllers/boutiqueController.js'
import verifyToken from "../../middlewares/verfiyToken.js";

const route = express.Router();

route
.get("/all-boutique-banners",verifyToken,getAllBoutiqueBanners)

export default route