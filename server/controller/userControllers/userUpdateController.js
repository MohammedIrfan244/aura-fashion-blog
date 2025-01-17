import User from "../../model/usersModel.js";
import Otp from "../../model/otpModel.js";
import bcrypt from "bcrypt";
import CustomError from "../../utilities/CustomError.js";
import transporter from "../../config/nodemailer.js";

const updateUser = async (req, res, next) => {
 if(req.file){
     const user = await User.findById(req.user.id);
     console.log("from update",req.file)
 }
 if(req.body.username){
     const usernameExists = await User.findOne({username: req.body.username});
     if(usernameExists){
        console.log("Username already exists")
         return next(new CustomError("Username already exists", 400));
     }
     const user = await User.findById(req.user.id);
     console.log("from update",req.body.username)
 }
};


const sendPasswordResetOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new CustomError("User not found", 404));
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
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. This OTP will expire in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

const verifyOTPAndResetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await Otp.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return next(new CustomError("Invalid or expired OTP", 400));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  updateUser,
  sendPasswordResetOTP,
  verifyOTPAndResetPassword,
};
