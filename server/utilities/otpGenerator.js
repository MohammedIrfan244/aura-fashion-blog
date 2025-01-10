import otpGenerator from "otp-generator";

const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

export default generateOTP;
