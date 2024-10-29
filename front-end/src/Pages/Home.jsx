import { useInView } from "react-intersection-observer";
import Boutique from "../Components/Boutique";
import Hero from "../Components/Hero";
import Style from "../Components/Style";
import GoTopPopUp from "../Shared/GoTopPopUp";

function Home() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  return (
    <div className="overflow-x-hidden max-w-full">
      <Hero />
      <GoTopPopUp />
      <Style />
      <div
      ref={ref}
       className={`mt-20 ps-5 text-5xl font-agdasima tracking-wider transition-all w-auto h-12 overflow-hidden ${inView ? 'animate-widthGrow opacity-100' : 'opacity-0'}`}
        style={{
          "--tw-width-100": "700px",
          animationDuration: "700ms",
        }}>
      <p>
        Checkout Your Faviorate Brands <span className="text-electricBlue">.</span>
      </p>
        </div>
      <Boutique />
    </div>
  );
}

export default Home;
