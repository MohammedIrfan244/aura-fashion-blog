import { useDispatch } from "react-redux";
import { hideSearchBar } from "../Redux/CommonSlice";

function Posts() {
  const dispatch=useDispatch()
  return <div className="pt-16" onClick={()=>dispatch(hideSearchBar())}>posts</div>;
}

export default Posts;
