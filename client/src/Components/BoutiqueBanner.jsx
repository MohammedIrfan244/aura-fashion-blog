import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosErrorManager from "../Utilities/axiosErrorManager";

// const brands = [
//   "https://i.pinimg.com/736x/40/c9/9d/40c99d88e134e6bc3a69ea08a7ae8ac5.jpg",
//   "https://i.pinimg.com/736x/02/c0/eb/02c0ebbcafe56eb362e8d6c52a9e17b1.jpg",
//   "https://i.pinimg.com/736x/f1/13/ba/f113baf812218151fd275de930f1f9ce.jpg",
//   "https://i.pinimg.com/736x/fc/a0/55/fca055f7b9fc108b55bcca4b83ab4b1b.jpg",
//   "https://i.pinimg.com/736x/b6/91/ef/b691ef408a87507555b2c89463419efb.jpg",
//   "https://i.pinimg.com/736x/5a/ef/93/5aef933a0f36ee593dd67ac7aa5d1086.jpg",
//   "https://i.pinimg.com/736x/9a/a3/71/9aa371f1cc645260e32fa08cd65d42c9.jpg",
//   "https://i.pinimg.com/736x/a2/9d/07/a29d0780c758324da2e1bbab7ec58e28.jpg",
// ];

function BoutiqueBanner() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + "/public/all-boutique-banners");
      setCategories(response.data.categories);
      console.log(response.data.categories);
    } catch (err) {
      console.log(axiosErrorManager(err));
    }
  }

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
        <SwiperSlide key={index} >
          <img src={brand?.banner} className="h-full w-full object-cover" alt="brand" />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
}

export default BoutiqueBanner;
