import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosErrorManager from "../Utilities/axiosErrorManager";

function BoutiqueBanner() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/public/all-boutique-badges"
      );
      setCategories(response.data.categories);
    } catch (err) {
      console.log(axiosErrorManager(err));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex justify-center mb-20 h-20 bg-white overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {categories?.map((brand, index) => (
          <SwiperSlide key={index}>
            <img
              src={brand?.badge}
              className="h-full w-full object-cover"
              alt="brand"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BoutiqueBanner;
