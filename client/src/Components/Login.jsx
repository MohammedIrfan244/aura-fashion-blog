import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Login({ registerFunc }) {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [identity, setidentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/auth/login", {
        identity,
        password,
      });
      console.log(response.data)
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.userCredentials));
      toast.success(response.data.message);
      setError("");
      setPassword("");
      setidentity("");
      navigate('/')
    } catch (err) {
      console.log(axiosErrorManager(err));
      setError(axiosErrorManager(err));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-richBlack">
      <div className="bg-richBlack shadow-lg shadow-black p-10 max-w-md w-full">
        <h2 className="text-2xl font-beban text-snowWhite text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <input
              type="identity"
              id="identity"
              required
              value={identity}
              className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm"
              placeholder="Enter your identity"
              onChange={(e) => setidentity(e.target.value)}
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={passwordToggle ? "text" : "password"}
                id="password"
                required
                value={password}
                className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite px-3 py-1 placeholder:text-snowWhite placeholder:text-sm"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setPasswordToggle(!passwordToggle)}
                className="absolute inset-y-0 right-3 flex items-center text-snowWhite focus:outline-none"
              >
                {passwordToggle ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
            {error.length > 0 && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-snowWhite text-[#2E2E33] font-medium py-1 px-2 hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-snowWhite mt-4">
          New here?{" "}
          <button
            onClick={registerFunc}
            className="text-electricBlue hover:underline focus:outline-none"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
