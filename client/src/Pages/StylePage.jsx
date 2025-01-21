import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import GoTopPopUp from "../Utilities/GoTop";
import StyleCollectionCard from "../Shared/StyleCollectionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { hideSearchBar } from "../Redux/CommonSlice";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import axiosInstance from "../Utilities/axiosInstance";
import { useSearchParams } from "react-router-dom";
import StyleCollectionCardSkeleton from "../skeltons/StyleCollectionCardSkeleton";

function StylePage() {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [styleCategories, setStyleCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStyleCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          import.meta.env.VITE_API_URL + "/public/all-style-categories"
        );
        setStyleCategories(response.data.categories);
      } catch (error) {
        console.log(axiosErrorManager(error));
      } finally {
        setLoading(false);
      }
    };
    getStyleCategories();
  }, []);
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleCategoryChange = (category) => {
    setSearchParams({ category });
  };
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const getStyles = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          import.meta.env.VITE_API_URL +
            `/style/style-by-category?category=${selectedCategory}`
        );
        setStyles(response.data.styles);
      } catch (error) {
        console.log(axiosErrorManager(error));
      } finally {
        setLoading(false);
      }
    };
    getStyles();
  }, [selectedCategory]);

  return (
    <div
      className="pt-16 px-5 min-h-screen"
      onClick={() => dispatch(hideSearchBar())}
    >
      <div className="my-5 flex justify-center sm:justify-between w-full">
        <h2 className="hidden sm:block font-beban text-electricBlue">
          {selectedCategory}
        </h2>
        <div
          className="flex items-center w-full sm:w-auto gap-2 animate-slideY transition-all"
          style={{
            animationDuration: "500ms",
            "--tw-translate-y": "-60px",
            "--tw-translate-y-70": "0px",
          }}
        >
          <button
            onClick={handlePrev}
            className="text-xl hover:text-electricBlue"
          >
            <CiCircleChevLeft />
          </button>
          <Swiper
            ref={swiperRef}
            className="w-[400px]"
            slidesPerView={3}
            centeredSlides
            loop
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {styleCategories.map((style, index) => (
              <SwiperSlide key={index}>
                <button
                  onClick={() => handleCategoryChange(style?.name)}
                  className={`w-32 px-1 py-2 text-xs ${
                    selectedCategory === style?.name
                      ? "bg-electricBlue text-snowWhite"
                      : "text-richBlack bg-snowWhite"
                  }`}
                >
                  {style.title}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handleNext}
            className="text-xl hover:text-electricBlue"
          >
            <CiCircleChevRight />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <StyleCollectionCardSkeleton key={index} />
            ))
          : styles.map((style, index) => (
              <StyleCollectionCard
                key={style._id + String(index)}
                style={style}
              />
            ))}
      </div>
      <GoTopPopUp />
    </div>
  );
}

export default StylePage;
