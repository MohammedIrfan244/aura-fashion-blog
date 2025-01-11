import express from "express";
import tryCatch from "../utilities/tryCatch.js";
import { loginUser, logoutUser, refreshToken, sendOtp, verifyOtpAndRegister } from "../controllers/authController.js";


const router = express.Router();

router
.post("/send-otp-mail", tryCatch(sendOtp))
.post("/verify-otp-and-register", tryCatch(verifyOtpAndRegister))
.post("/refresh-token", tryCatch(refreshToken))
.post("/logout", tryCatch(logoutUser))
.post("/login", tryCatch(loginUser))


export default router