
import Boutique from "../Components/Boutique";
import Hero from "../Components/Hero";
import Style from "../Components/Style";
import GoTopPopUp from "../Utilities/GoTop";
import { hideSearchBar } from "../Redux/CommonSlice";
import { useDispatch } from "react-redux";
import StylingMatter from "../Components/StylingMatter";
import AboutUs from "../Components/AboutUs";

function Home() {
  const dispatch=useDispatch()
  return (
    <div className="overflow-x-hidden max-w-full min-h-screen" onClick={()=>dispatch(hideSearchBar())}>
      <Hero />
      <GoTopPopUp />
      <StylingMatter/>
      <Style />
      <Boutique />
      <AboutUs/>
    </div>
  );
}

export default Home;
