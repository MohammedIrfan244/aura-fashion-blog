import express from "express";
import tryCatch from "../utilities/tryCatch.js";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  sendOtp,
  verifyOtpAndRegister,
} from "../controller/authController.js";

const router = express.Router();

router
  .post("/register", tryCatch(registerUser))
  .post("/verify-otp-and-register", tryCatch(verifyOtpAndRegister))
  .post("/send-otp-mail", tryCatch(sendOtp))
  .post("/refresh-token", tryCatch(refreshToken))
  .post("/logout", tryCatch(logoutUser))
  .post("/login", tryCatch(loginUser));

export default router;
