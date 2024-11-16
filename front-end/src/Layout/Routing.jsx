import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import BoutiquePage from "../Pages/BoutiquePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBoutiques } from "../Redux/BoutiqueSlice";
import { fetchStyles } from "../Redux/StyleSlice";
import { fetchUsers } from "../Redux/UserSlice";
import StylePage from "../Pages/StylePage";
import Contact from "../Pages/Contact";
import StyleDetailPage from "../Pages/StyleDetailPage";
import NotFuond from '../Pages/NotFound'
import User from "../Pages/User";
import Login_SignUp from "../Pages/Login_SignUp";

function Routing() {
  const {styles}=useSelector((state)=>state.styles)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchBoutiques("http://localhost:3001/buotiques"));
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchStyles("http://localhost:3001/styles"));
  // }, [dispatch,styles]);
  // useEffect(() => {
  //   dispatch(fetchUsers("http://localhost:3001/users"));
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boutiques" element={<BoutiquePage />} />
      <Route path="/styles" element={<StylePage />} />
      <Route path="/styles/:id" element={<StyleDetailPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/user" element={<User />} />
      <Route path="/login_Signup" element={<Login_SignUp />} />
      <Route path="*" element={<NotFuond/>}/>
    </Routes>
  );
}

export default Routing;
