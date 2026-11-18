import express from "express";
import {
  getAllBoutiqueBanners,
  getBoutiqueByCategory,
  getBoutiqueById,
  createBoutique,
  addBoutiqueReview,
  getBoutiqueReviews,
  deleteBoutiqueReview,
} from "../../controller/userControllers/boutiqueController.js";
import verifyToken from "../../middlewares/verfiyToken.js";
import idValidation from "../../middlewares/idValidation.js";
import tryCatch from "../../utilities/tryCatch.js";
import upload from "../../config/multerConfig.js";
import uploadToCloudinary from "../../middlewares/fileUpload.js";

const route = express.Router();

route
  .get("/all-boutique-banners", verifyToken, tryCatch(getAllBoutiqueBanners))
  .get(
    "/get-boutique-by-category",
    verifyToken,
    tryCatch(getBoutiqueByCategory)
  )
  .get(
    "/get-boutique-by-id/:id",
    verifyToken,
    idValidation,
    tryCatch(getBoutiqueById)
  )
  .post(
    "/create-boutique",
    verifyToken,
    upload.array("files", 4),
    uploadToCloudinary,
    tryCatch(createBoutique)
  )
  .post("/review/:id", verifyToken, idValidation, tryCatch(addBoutiqueReview))
  .get("/reviews/:id", verifyToken, idValidation, tryCatch(getBoutiqueReviews))
  .delete("/review/:id", verifyToken, idValidation, tryCatch(deleteBoutiqueReview));

export default route;
