/* eslint-disable react/prop-types */
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import axiosInstance from "../Utilities/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Auth";

const formFields = [
  { label: "Username", type: "text", name: "userName" },
  { label: "Email", type: "email", name: "email" },
];

const initialValues = {
  userName: "",
  email: "",
  password: "",
  conformPassword: "",
};

function SignUp({ loginFunc }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("User Name is required")
      .min(3, "Username must be at least 3 characters")
      .max(10, "Username cannot exceed 10 characters")
      .matches(
        /^[a-z_]+$/,
        "Username can only contain lowercase letters and underscores"
      ),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password cannot exceed 15 characters"),
    conformPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      try {
        setLoading(true);
        await axiosInstance.post("/auth/register", {
          email: values.email,
          username: values.userName,
          password: values.password,
        });
        const response = await axiosInstance.post("/auth/login", {
          identity: values.email,
          password: values.password,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        dispatch(login(response.data.userCredentials));
        navigate("/");
      } catch (err) {
        console.log(axiosErrorManager(err));
        setError(axiosErrorManager(err));
      } finally {
        setLoading(false);
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
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <p className="text-red-600 text-sm">
                  {formik.errors[field.name]}
                </p>
              )}
            </div>
          ))}

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
              <p className="text-red-600 text-sm">{formik.errors.password}</p>
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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-snowWhite text-[#2E2E33] font-bold py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
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
