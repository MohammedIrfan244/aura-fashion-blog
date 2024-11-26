
import Boutique from "../Components/Boutique";
import Hero from "../Components/Hero";
import Style from "../Components/Style";
import GoTopPopUp from "../Utilities/GoTopPopUp";
import { hideSearchBar } from "../Redux/CommonSlice";
import { useDispatch } from "react-redux";
import StylingMatter from "../Components/StylingMatter";
import BoutiqueBanner from "../Components/BoutiqueBanner";

function Home() {
  const dispatch=useDispatch()
  return (
    <div className="overflow-x-hidden max-w-full" onClick={()=>dispatch(hideSearchBar())}>
      <Hero />
      <GoTopPopUp />
      <StylingMatter/>
      <Style />
      <BoutiqueBanner/>
      <Boutique />
    </div>
  );
}

export default Home;
