import express from "express";
import tryCatch from "../../utilities/tryCatch.js";
import {
  getOneStyle,
  getStyleByCategory,
  likeStyle,
  createStyle,
  addStyleComment,
  getStyleComments,
  deleteStyleComment,
} from "../../controller/userControllers/styleController.js";
import idValidation from "../../middlewares/idValidation.js";
import verifyToken from "../../middlewares/verfiyToken.js";
import upload from "../../config/multerConfig.js";
import uploadToCloudinary from "../../middlewares/fileUpload.js";

const route = express.Router();

route
  .get("/style-by-category", verifyToken, tryCatch(getStyleByCategory))
  .get("/style-by-id/:id", verifyToken, idValidation, tryCatch(getOneStyle))
  .post("/style-like/:id", verifyToken, idValidation, tryCatch(likeStyle))
  .post(
    "/create-style",
    verifyToken,
    upload.single("file"),
    uploadToCloudinary,
    tryCatch(createStyle)
  )
  .post("/comment/:id", verifyToken, idValidation, tryCatch(addStyleComment))
  .get("/comments/:id", verifyToken, idValidation, tryCatch(getStyleComments))
  .delete("/comment/:id", verifyToken, idValidation, tryCatch(deleteStyleComment));

export default route;
