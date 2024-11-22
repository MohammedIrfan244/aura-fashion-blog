import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpMessage from "../Shared/PopUpMessage";

function User() {
  const [showPopUp, setShowPopUp] = useState(false);
  const { currentUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggingOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="pt-16">
      {currentUser?.userName}

      <button onClick={() => setShowPopUp(true)}>logout</button>
      {showPopUp && (
        <PopUpMessage
          onConfirm={loggingOut}
          onCancel={() => setShowPopUp(false)}
          message={"Are you sure you want to logout ?"}
        />
      )}
    </div>
  );
}

export default User;
