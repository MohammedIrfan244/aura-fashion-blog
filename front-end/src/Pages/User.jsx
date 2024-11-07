import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Auth";
import { useNavigate } from "react-router-dom";
function User() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logingOut=()=>{
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className="pt-16">
      {currentUser?.userName}
      <button onClick={logingOut}>logout</button>
    </div>
  );
}

export default User;
