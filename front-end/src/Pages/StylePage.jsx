import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import GoTopPopUp from "../Shared/GoTopPopUp";
import { useLocation } from "react-router-dom";
import StyleCollectionCard from "../Shared/StyleCollectionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

function StylePage() {
  const { styles } = useSelector((state) => state.styles);
  const [showStyles, setShowStyles] = useState([]);
  const location = useLocation();
  const { stylesIndex } = location.state || {};
  const [selectedIndex, setSelectedIndex] = useState(
    stylesIndex || stylesIndex === 0 ? parseInt(stylesIndex) : null
  );

  const swiperRef = useRef(null);

  useEffect(() => {
    if (selectedIndex === null) {
      const allStylePosts = styles?.flatMap((item) => item.stylePosts || []);
      setShowStyles(allStylePosts);
    } else {
      const selectedStylePosts = styles[selectedIndex]?.stylePosts || [];
      setShowStyles(selectedStylePosts);
    }
  }, [styles, selectedIndex]);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className="pt-16 px-5">
      <div className="my-5 flex justify-center sm:justify-between w-full">
        <h2 className="hidden sm:block font-beban text-electricBlue">
          {!styles[selectedIndex] ? "All" : styles[selectedIndex].name}
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
            {styles?.map((style, index) => (
              <SwiperSlide key={index}>
                <button
                  onClick={() => handleIndexChange(index)}
                  className={`bg-snowWhite w-32 px-1 py-2 text-xs ${
                    index === selectedIndex
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
