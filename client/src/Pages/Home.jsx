import { useInView } from "react-intersection-observer";
import Boutique from "../Components/Boutique";
import Hero from "../Components/Hero";
import Style from "../Components/Style";
import GoTopPopUp from "../Shared/GoTopPopUp";
import { hideSearchBar } from "../Redux/CommonSlice";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch=useDispatch()
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  return (
    <div className="overflow-x-hidden max-w-full" onClick={()=>dispatch(hideSearchBar())}>
      <Hero />
      <GoTopPopUp />
      <Style />
      <div
        ref={ref}
        className={`mt-20 ps-5 text-3xl sm:text-4xl md:text-5xl font-agdasima transition-all w-auto overflow-hidden h-12 ${
          inView ? "animate-widthGrow opacity-100" : "opacity-0"
        }`}
        style={{
          "--tw-width-100": "700px",
          animationDuration: "700ms",
        }}
      >
        <p className="text-snowWhite break-words">
          Checkout Your Favorite Brands{" "}
          <span className="text-electricBlue">.</span>
        </p>
      </div>
      <Boutique />
    </div>
  );
}

export default Home;
