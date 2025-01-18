import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";
import { hideSearchBar } from "../Redux/CommonSlice";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import axiosInstance from "../Utilities/axiosInstance";
import GoTopPopUp from "../Utilities/GoTop";

function BoutiquePage() {
  const [boutiqueBanners, setBoutiqueBanners] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Find the index of the current brand in the banners array
  const getCurrentIndex = (banners, brandName) => {
    const index = banners.findIndex(item => item.name=== brandName);
    return index >= 0 ? index : 0;
  };

  // Update URL and handle carousel navigation
  const handleCarouselNav = (direction) => {
    const currentIndex = getCurrentIndex(boutiqueBanners, searchParams.get("brand"));
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % boutiqueBanners.length
      : (currentIndex - 1 + boutiqueBanners.length) % boutiqueBanners.length;
    
    setSearchParams({ brand: boutiqueBanners[newIndex].name});
  };

  // Fetch boutique banners on component mount
  useEffect(() => {
    const getBoutiqueBanners = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/boutique/all-boutique-banners`
        );
        setBoutiqueBanners(response.data.banners);
      } catch (err) {
        console.log(axiosErrorManager(err));
      }
    };
    getBoutiqueBanners();
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentBrandName = searchParams.get("brand");
  const currentIndex = getCurrentIndex(boutiqueBanners, currentBrandName);
  const currentBoutique = boutiqueBanners[currentIndex];

  return (
    <div onClick={() => dispatch(hideSearchBar())} className="min-h-screen">
      <div
        className="pt-16 animate-slideX"
        key={currentIndex}
        style={{
          "--tw-translate-x": "100px",
          "--tw-translate-x-70": "-10px",
          animationDuration: "700ms",
        }}
      >
        <div className="h-20 overflow-hidden flex items-center relative">
          <BiSolidChevronLeftCircle
            className="absolute top-26 left-3 text-2xl text-electricBlue cursor-pointer z-10"
            onClick={() => handleCarouselNav('prev')}
          />
          {currentBoutique && (
            <img
              src={currentBoutique.banner}
              alt={`${currentBoutique.name} banner`}
              className="w-full"
            />
          )}
          <BiSolidChevronRightCircle
            className="absolute top-26 right-3 text-2xl text-electricBlue cursor-pointer z-10"
            onClick={() => handleCarouselNav('next')}
          />
        </div>
        
        <div className="flex items-center justify-between h-auto w-full p-3">
          <p className="text-2xl font-beban text-electricBlue">
            {currentBoutique?.title}
          </p>
          <p className="text-[10px] font-thin w-80">
            *Products displayed here are for inspiration and exploration. <br />
            No purchases available. (purchase source available) <br />
            *We value your feedback! Please keep comments respectful and
            constructive to help others in our community.
          </p>
        </div>
      </div>
      <GoTopPopUp />
    </div>
  );
}

export default BoutiquePage;