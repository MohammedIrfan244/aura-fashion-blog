import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StyleCards from "../Shared/StyleCards";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import StyleCardSkeleton from "../skeltons/StyleCardSkeleton";

function Style() {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchStyles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/public/all-style-categories"
      );
      setStyles(response.data.categories);
    } catch (err) {
      console.log(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStyles();
  }, []);
  return (
    <div>
      <h1 className="my-5 sm:my-10 text-2xl font-windSong text-center font-bold">
        Chose Your Style
      </h1>
      <Swiper
        className="py-1"
        loop={true}
        centeredSlides={true}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={styles + String(index)}>
              <StyleCardSkeleton key={index} />
            </SwiperSlide>
            ))
          : styles?.map((style, index) => (
              <SwiperSlide key={index + style._id}>
                <StyleCards
                  image={style?.image}
                  name={style?.name}
                  title={style?.title}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default Style;
