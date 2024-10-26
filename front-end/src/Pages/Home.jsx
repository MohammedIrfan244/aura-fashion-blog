import Boutique from "../Components/Boutique";
import Hero from "../Components/Hero"
import Style from "../Components/Style";
import GoTopPopUp from "../Shared/GoTopPopUp";


function Home() {
  return (
    <div className="overflow-x-hidden max-w-full">
      <Hero />
      <GoTopPopUp/>
      <Style/>
      <Boutique/>
    </div>
  );
}


export default Home