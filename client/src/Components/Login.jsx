import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

function Login() {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFormValid = () => email.trim() !== "" && password.trim() !== "";

  const findUserByEmail = () => users?.find((user) => user?.email === email);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setPassError(true);
      return;
    }

    const inputUser = findUserByEmail();

    if (inputUser) {
      if (inputUser.password === password) {
        dispatch(login(inputUser));
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        setPassError(true);
      }
    } else {
      toast.error("New here? Please create an account.");
    }

    setEmail("");
    setPassword("");
    setPasswordToggle(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-richBlack">
  <div className="bg-richBlack shadow-lg shadow-black p-10 max-w-md w-full">
    <h2 className="text-2xl font-beban text-snowWhite text-center mb-6">Welcome Back</h2>
    <form onSubmit={handleFormSubmit} className="space-y-5">
      <div>
       
        <input
          type="email"
          id="email"
          required
          value={email}
          className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite py-1 px-3 placeholder:text-snowWhite placeholder:text-sm rounded-md"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        
        <div className="relative">
          <input
            type={passwordToggle ? "text" : "password"}
            id="password"
            required
            value={password}
             className="mt-1 block w-full focus:outline-dotted bg-[#2E2E33] hover:shadow hover:shadow-electricBlue text-snowWhite px-3 py-1 placeholder:text-snowWhite placeholder:text-sm rounded-md"
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
        {passError && <p className="text-red-600 text-sm mt-1">Password is incorrect</p>}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-[#2E2E33] text-snowWhite font-medium py-2 px-4 rounded-md hover:bg-electricBlue focus:outline-none focus:ring-1 focus:ring-[#2E2E33] focus:ring-offset-1"
        >
          Submit
        </button>
      </div>
    </form>

    <p className="text-sm text-center text-gray-600 mt-4">
      New here?{" "}
      <a
        href="/register"
        className="text-electricBlue hover:underline focus:outline-none"
      >
        Create an account
      </a>
    </p>
  </div>
</div>

  );
}

export default Login;

