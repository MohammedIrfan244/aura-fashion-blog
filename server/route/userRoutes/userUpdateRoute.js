import express from "express";
import tryCatch from "../../utilities/tryCatch.js";
import {
  updateUser,
  sendPasswordResetOTP,
  verifyOTPAndResetPassword,
} from "../../controller/userControllers/userUpdateController.js";
import upload from "../../config/multerConfig.js";
import uploadToCloudinary from "../../middlewares/fileUpload.js";
import verifyToken from "../../middlewares/verfiyToken.js";

const route = express.Router();

route
  .put(
    "/update-user",
    verifyToken,
    upload.single("file"),
    uploadToCloudinary,
    tryCatch(updateUser)
  )
  .post("/send-password-reset-otp", verifyToken, tryCatch(sendPasswordResetOTP))
  .post(
    "/verify-otp-and-reset-password",
    verifyToken,
    tryCatch(verifyOTPAndResetPassword)
  );

export default route;
