import express from "express";
import tryCatch from "../../utilities/tryCatch.js";
import { updateUser } from "../../controller/userControllers/userUpdateController.js";
import { verifyToken } from "../../middlewares/verfiyToken.js";
import upload from "../../config/multerConfig.js";
import uploadToCloudinary from "../../middlewares/fileUpload.js";

const route = express.Router();

route
.put("/update-user", upload.single("file"), uploadToCloudinary,verifyToken,tryCatch(updateUser))

export default route