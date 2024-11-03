import { useDispatch } from "react-redux";
import { hideSearchBar } from "../Redux/CommonSlice";

function Contact() {
  const dispatch=useDispatch()
  return <div onClick={()=>dispatch(hideSearchBar())} className="pt-16">Contact</div>;
}

export default Contact;
