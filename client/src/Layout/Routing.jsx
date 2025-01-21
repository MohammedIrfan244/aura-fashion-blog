import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import BoutiquePage from "../Pages/BoutiquePage";
import { useSelector } from "react-redux";
import StylePage from "../Pages/StylePage";
import Contact from "../Pages/Contact";
import StyleDetailPage from "../Pages/StyleDetailPage";
import NotFound from "../Pages/NotFound";
import User from "../Pages/User";
import Login_SignUp from "../Pages/Login_SignUp";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Subscription from "../Pages/Subscription";
import ScrollTop from "../Utilities/ScrollTop";

function Routing() {
  const { currentUser } = useSelector((state) => state.currentUser);

  return (
    <>
      <Navbar />
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/boutiques"
          element={currentUser ? <BoutiquePage /> : <Login_SignUp />}
        />
        <Route
          path="/styles"
          element={currentUser ? <StylePage /> : <Login_SignUp />}
        />
        <Route
          path="/style/:category/:id"
          element={currentUser ? <StyleDetailPage /> : <Login_SignUp />}
        />
        <Route
          path="/contact"
          element={currentUser ? <Contact /> : <Login_SignUp />}
        />
        <Route
          path="/user"
          element={currentUser ? <User /> : <Login_SignUp />}
        />
        <Route
          path="/login_Signup"
          element={currentUser ? <User /> : <Login_SignUp />}
        />
        <Route
          path="/subscription"
          element={currentUser ? <Subscription /> : <Login_SignUp />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Routing;
