import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import BoutiquePage from "../Pages/BoutiquePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBoutiques } from "../Redux/BoutiqueSlice";
import { fetchStyles } from "../Redux/StyleSlice";
import StylePage from "../Pages/StylePage";
import Contact from "../Pages/Contact";
import StyleDetailPage from "../Pages/StyleDetailPage";
import NotFound from "../Pages/NotFound";
import User from "../Pages/User";
import Login_SignUp from "../Pages/Login_SignUp";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Subscription from "../Pages/Subscription";

function Routing() {
  const dispatch = useDispatch();
  const {currentUser}=useSelector((state) => state.currentUser);
  useEffect(() => {
    dispatch(fetchBoutiques("http://localhost:3001/boutiques"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStyles("http://localhost:3001/styles"));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boutiques" element={<BoutiquePage />} />
        <Route path="/styles" element={<StylePage />} />
        <Route path="/styles/:id" element={currentUser?<StyleDetailPage />:<Login_SignUp/>} />
        <Route path="/contact" element={currentUser?<Contact />:<Login_SignUp/>} />
        <Route path="/user" element={currentUser?<User />:<Login_SignUp/>} />
        <Route path="/login_Signup" element={currentUser?<User/>:<Login_SignUp />} />
        <Route path="/subscription" element={currentUser?<Subscription/>:<Login_SignUp/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default Routing;
