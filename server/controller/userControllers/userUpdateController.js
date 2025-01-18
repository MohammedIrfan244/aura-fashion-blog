import User from "../../model/usersModel.js";
import Otp from "../../model/otpModel.js";
import bcrypt from "bcrypt";
import CustomError from "../../utilities/CustomError.js";
import transporter from "../../config/nodemailer.js";
import generateOTP from "../../utilities/otpGenerator.js";

const updateUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  if (req.body.username && req.username !== "") {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return next(new CustomError("Username already exists", 400));
    }
    user.username = req.body.username;
  }
  if (req.uploadedFile) {
    user.profile = req.uploadedFile.secure_url;
  }
  const userCredentials = {
    username:
      req.body.username && req.body.username !== ""
        ? req.body.username
        : user.username,
    profile: req.uploadedFile ? req.uploadedFile.secure_url : user.profile,
  };
  await user.save();
  res
    .status(200)
    .json({ message: "User updated successfully", userCredentials });
};

const sendPasswordResetOTP = async (req, res, next) => {
  const { currentPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid current password", 400));
  }
  const email = user.email;

  const otp = generateOTP();
  const otpEntry = new Otp({
    email,
    otp,
  });
  await otpEntry.save();

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is ${otp}. This OTP will expire in 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: "Password reset OTP sent successfully" });
};

const verifyOTPAndResetPassword = async (req, res, next) => {
  const { otp, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const email = user.email;

  const otpRecord = await Otp.findOne({
    email,
    otp,
  });

  if (!otpRecord) {
    return next(new CustomError("Invalid or expired OTP", 400));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  await Otp.deleteOne({ _id: otpRecord._id });

  res.status(200).json({ message: "Password updated successfully" });
};

export { updateUser, sendPasswordResetOTP, verifyOTPAndResetPassword };
