import { useState } from "react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

function Login_SignUp() {
  const [SignUpState, setSignUpState] = useState(false);

  return (
    <div className="pt-16 min-h-screen">
      {!SignUpState && <Login registerFunc={() => setSignUpState(true)} />}
      {SignUpState && <SignUp loginFunc={() => setSignUpState(false)} />}
    </div>
  );
}

export default Login_SignUp;
