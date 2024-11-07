import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Auth";
import { useNavigate } from "react-router-dom";

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
        alert("Logged in successfully");
        navigate("/");
      } else {
        alert("Incorrect password");
      }
    } else {
      alert("New here? Please create an account.");
    }

    setEmail("");
    setPassword("");
    setPasswordToggle(false);
    setPassError(false);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          required
          value={email}
          className="text-richBlack"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={passwordToggle ? "text" : "password"}
          value={password}
          required
          className="text-richBlack"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passError && <p>Password is required</p>}

        <button
          type="button"
          onClick={() => setPasswordToggle(!passwordToggle)}
        >
          {passwordToggle ? "Hide" : "Show"} Password
        </button>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
