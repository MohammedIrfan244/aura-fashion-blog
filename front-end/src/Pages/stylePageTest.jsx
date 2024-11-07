import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoTopPopUp from "../Shared/GoTopPopUp";
import { useLocation } from "react-router-dom";
import StyleCollectionCard from "../Shared/StyleCollectionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { hideSearchBar } from "../Redux/CommonSlice";

function StylePage() {
  const dispatch = useDispatch();
  const stylesMap = [
    {
      name: "Everyday Makeup",
    },
    {
      name: "Glam Makeup Palette",
    },
    {
      name: "Skincare Essential",
    },
    {
      name: "Haircare Essentials",
    },
    {
      name: "Nailcare Boutique",
    },
    {
      name: "On Seasonal Trends",
    },
    {
      name: "Gothic Wardrobe",
    },
    {
      name: "Fashion Accessories",
    },
    {
      name: "Athleisure Collective",
    },
  ];
  const { styles } = useSelector((state) => state.styles);
  const [showStyles, setShowStyles] = useState([]);
  const location = useLocation();
  const { category } = location.state || {};
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category : null
  );

  useEffect(() => {
    selectedCategory == null
      ? setShowStyles([...styles])
      : [...styles].filter((item) => item.category == category);
  }, [category, selectedCategory, styles]);

  const swiperRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className="pt-16 px-5" onClick={() => dispatch(hideSearchBar())}>
      <div className="my-5 flex justify-center sm:justify-between w-full">
        <h2 className="hidden sm:block font-beban text-electricBlue">
          {selectedCategory == null ? "All" : category}
        </h2>
        <div
          className="flex items-center gap-2 animate-slideY transition-all"
          style={{
            animationDuration: "500ms",
            "--tw-translate-y": "-60px",
            "--tw-translate-y-70": "0px",
          }}
        >
          <button
            onClick={handlePrev}
            className="text-xl hover:text-electricBlue hidden sm:block"
          >
            <CiCircleChevLeft />
          </button>
          <Swiper
            ref={swiperRef}
            className="w-[400px]"
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {stylesMap.map((style, index) => (
              <SwiperSlide key={index}>
                <button
                  onClick={() => handleCategoryChange(style.name)}
                  className={`bg-snowWhite w-32 px-1 py-2 text-xs ${
                    style.name === selectedCategory
                      ? "text-electricBlue"
                      : "text-richBlack"
                  }`}
                >
                  {style?.name}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={handleNext}
            className="text-xl hover:text-electricBlue hidden sm:block"
          >
            <CiCircleChevRight />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {showStyles?.map((style, index) => (
          <StyleCollectionCard key={index} style={style} index={index} />
        ))}
      </div>
      <GoTopPopUp />
    </div>
  );
}

export default StylePage;
