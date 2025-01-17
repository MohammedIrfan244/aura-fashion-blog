import User from "../model/usersModal.js";
import { joiUserSchema } from "../model/joiVerifyModel.js";
import Otp from "../model/otpModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateOTP from "../utilities/otpGenerator.js";
import CustomError from "../utilities/CustomError.js";
import transporter from "../config/nodemailer.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, { expiresIn: "7d" });
};

const sendOtp = async (req, res, next) => {
  const { email, username } = req.body;
  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });
  if (existingEmail || existingUsername) {
    return next(new CustomError("User already exist", 400));
  }
  const otp = generateOTP();
  const otpEntry = new Otp({
    email,
    otp,
  });
  await otpEntry.save();

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
  };
  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: "OTP sent successfully to the email" });
};

const verifyOtpAndRegister = async (req, res, next) => {
  const {value,error} = joiUserSchema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  const { email, otp, username, password } = value;
  const otpEntry = await Otp.findOne({ email, otp });
  if (!otpEntry) {
    Otp.deleteMany({ email });
    return next(new CustomError("Invalid OTP", 400));
  }
  Otp.deleteMany({ email });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    username,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req, res, next) => {
  const { identity, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: identity }, { email: identity }],
  });
  if (!user) {
    return next(new CustomError("Invalid credentials", 400));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 400));
  }
  const accessToken = createToken(user.id);
  const refreshToken = createRefreshToken(user.id);
  const userCredentials = { username: user.username, profile: user.profile };

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "User logged in successfully", accessToken, userCredentials });
};

const refreshToken = async (req, res, next) => {
  if(!req.cookies) return next(new CustomError("Refresh token not found", 401));
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(new CustomError("Refresh token not found", 401));
  }
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new CustomError("User not found", 401));
  }
  const accessToken = createToken(user.id);
  res.status(200).json({ accessToken , message: "Token refreshed successfully" });
};

const logoutUser = (req, res, next) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "User logged out successfully" });
};

export { sendOtp, verifyOtpAndRegister, loginUser , refreshToken, logoutUser };
