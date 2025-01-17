/* eslint-disable react/prop-types */
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import axiosInstance from "../Utilities/axiosInstance";

const formFields = [
  { label: "User Name", type: "text", name: "userName" },
  { label: "Email", type: "email", name: "email" },
];

const initialValues = {
  userName: "",
  email: "",
  password: "",
  conformPassword: "",
  otp: "",
};

function SignUp({loginFunc}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP has been sent
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    userName: yup.string().required("User Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    conformPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      setError("");
      if (!otpSent) {
        try {
          setLoading(true);
          const response = await axiosInstance.post("/auth/send-otp-mail", {
            email: formik.values.email,
            username: formik.values.userName,
          })
          setOtpSent(true);
          console.log(response.data);
        } catch (err) {
          console.log(axiosErrorManager(err));
          setError("Failed to send OTP. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const response = await axiosInstance.post("/auth/verify-otp-and-register", {
            email: formik.values.email,
            otp: formik.values.otp,
            username: formik.values.userName,
            password: formik.values.password
          })
          console.log(response.data);
          const response2 = await axiosInstance.post("/auth/login", {
            identity: formik.values.email,
            password: formik.values.password
          })
          console.log(response2.data);
          navigate("/");
        } catch (err) {
          setError(err.response?.data?.message || "Verification failed.");
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-richBlack">
      <div className="bg-richBlack shadow-lg shadow-black p-10 max-w-md w-full">
        <h2 className="text-2xl font-beban text-snowWhite text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {formFields.map((field, index) => (
            <div key={index} className="space-y-1">
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                disabled={otpSent} // Disable input fields if OTP is sent
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <p className="text-red-600 text-sm">
                  {formik.errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {!otpSent && (
            <>
              {/* Password Fields */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    type={passwordToggle ? "text" : "password"}
                    id="password"
                    name="password"
                    className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordToggle(!passwordToggle)}
                    className="absolute inset-y-0 right-3 flex items-center text-snowWhite focus:outline-none"
                  >
                    {passwordToggle ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-600 text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <input
                    type={confirmPasswordToggle ? "text" : "password"}
                    id="conformPassword"
                    name="conformPassword"
                    className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                    placeholder="Confirm your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.conformPassword}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmPasswordToggle(!confirmPasswordToggle)
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-snowWhite focus:outline-none"
                  >
                    {confirmPasswordToggle ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
                {formik.touched.conformPassword &&
                  formik.errors.conformPassword && (
                    <p className="text-red-600 text-sm">
                      {formik.errors.conformPassword}
                    </p>
                  )}
              </div>
            </>
          )}

          {otpSent && (
            <div className="space-y-1">
              <input
                type="text"
                id="otp"
                name="otp"
                className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
                placeholder="Enter the OTP"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
              />
            </div>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-snowWhite text-[#2E2E33] font-bold py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : otpSent
              ? "Verify & Register"
              : "Get OTP"}
          </button>
        </form>
        <p className="text-sm text-center text-snowWhite mt-4">
          Already have an account?{" "}
          <button
            onClick={loginFunc}
            className="text-electricBlue hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
