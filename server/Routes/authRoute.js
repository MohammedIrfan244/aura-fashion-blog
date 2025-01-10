import express from "express";
import tryCatch from "../utilities/tryCatch.js";
import { loginUser, sendOtp, verifyOtpAndRegister } from "../controllers/authController.js";


const router = express.Router();

router
.post("/send-otp-mail", tryCatch(sendOtp))
.post("/verify-otp-and-register", tryCatch(verifyOtpAndRegister))
.post("/login", tryCatch(loginUser))


export default router