import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import BoutiquePage from "../Pages/BoutiquePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBoutiques } from "../Redux/BoutiqueSlice";
import { fetchStyles } from "../Redux/StyleSlice";
import { fetchUsers } from "../Redux/UserSlice";
import StylePage from "../Pages/StylePage";
import NotFound from "../Pages/NotFound";
import Posts from "../Pages/Posts";
import Contact from "../Pages/Contact";

function Routing() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBoutiques("http://localhost:3001/buotiques"));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchStyles("http://localhost:3001/styles"));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUsers("http://localhost:3001/users"));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boutiques" element={<BoutiquePage />} />
      <Route path="/styles" element={<StylePage />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
