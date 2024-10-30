import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BoutiqueDetails from "../Components/BoutiqueDetails";
import { useSelector } from "react-redux";
import {
  BiSolidChevronLeftCircle,
  BiSolidChevronRightCircle,
} from "react-icons/bi";
import BoutiqueCollectionCard from "../Shared/BoutiqueCollectionCard";
import GoTopPopUp from "../Shared/GoTopPopUp";

function BoutiquePage() {
  const [aniDirection, setAniDirection] = useState(false);
  const [animateKey, setAnimateKey] = useState(0); 
  const { boutiques } = useSelector((state) => state.boutiques);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const { boutiqueIndex } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(boutiqueIndex || 0);
  const currentBoutique = boutiques.find((_, index) => index === currentIndex);

  const handleInc = () => {
    setAniDirection(true); 
    setAnimateKey((prev) => prev + 1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % boutiques.length);
  };

  const handleDec = () => {
    setAniDirection(false); 
    setAnimateKey((prev) => prev + 1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + boutiques.length) % boutiques.length
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  return (
    <div>
    <div
      key={animateKey}
      className={`pt-16 animate-slideX ${selectedItem?"blur-sm ove":"blur-0"}`}
      style={{
        "--tw-translate-x": aniDirection ? "100px" : "-100px",
        "--tw-translate-x-70": aniDirection ? "-10px" : "10px",
        animationDuration: "700ms",
      }}
    >
      <div className="h-20 overflow-hidden flex items-center">
        <BiSolidChevronLeftCircle
          className="absolute top-26 left-3 text-2xl text-electricBlue cursor-pointer"
          onClick={handleDec}
        />
        <img src={currentBoutique?.banner} alt="banner" className="w-full" />
        <BiSolidChevronRightCircle
          className="absolute top-26 right-3 text-2xl text-electricBlue cursor-pointer"
          onClick={handleInc}
        />
      </div>
      <div className="flex items-center justify-between h-auto w-full p-3">
      <p className="text-2xl font-agdasima text-electricBlue">
        {currentBoutique?.name}
      </p>
      <p className="text-[10px] font-thin w-80">*Products displayed here are for inspiration and exploration. <br />No purchases available. (purchase source available) <br />
      *We value your feedback! Please keep comments respectful and constructive to help others in our community.
      </p>
      </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto place-items-center gap-y-5">
        {currentBoutique?.collections?.map((item, index) => (
          <BoutiqueCollectionCard
            key={index}
            boutique={item}
            click={() => setSelectedItem(item)}
            blur={selectedItem}
          />
        ))}
      </div>
        {selectedItem && (
          <BoutiqueDetails
            boutiqueItem={selectedItem}
            close={setSelectedItem}
          />
        )}
      <GoTopPopUp />
    </div>
  );
}

export default BoutiquePage;
