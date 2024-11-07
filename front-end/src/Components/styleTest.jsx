import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StyleCards from "../Shared/StyleCards";
import { useSelector } from "react-redux";

function Style() {
  const { styles } = useSelector((state) => state.styles);

  return (
    <div className="mt-20">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        centeredSlides={true}
        breakpoints={{
          320: {
            slidesPerView: 1.25,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2.25,
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
        {styles.map((style, index) => (
          <SwiperSlide key={index}>
            <StyleCards
              image={style.image}
              name={style.name}
              stylesIndex={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Style;
