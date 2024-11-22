import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StyleCards from "../Shared/StyleCards";

function Style() {
  const styles = [
    {
      name: "Everyday Makeup",
      image:
        "https://img.freepik.com/free-photo/portrait-confident-young-woman-smiling_23-2148452696.jpg?t=st=1729592606~exp=1729596206~hmac=317ab9e3b310f7e84377e872a7a1639cdf59521441c40e8131558f6b77d34f65&w=360",
    },
    {
      name: "Glam Makeup Palette",
      image:
        "https://img.freepik.com/free-photo/vintage-beautiful-girl-with-cigarette_144627-7956.jpg?t=st=1729684278~exp=1729687878~hmac=01e69d5ed48d519b6b8b2f99d0793c82d47d386bb54e70e8877cc43f5564934e&w=360",
    },
    {
      name: "Skincare Essential",
      image:
        "https://img.freepik.com/free-photo/different-foundation-arrangement_23-2148978148.jpg?t=st=1729663474~exp=1729667074~hmac=b613b1802928141459a74e3f0101fba1b6db04e9a8d490ee74e703787b78c1f3&w=360",
    },
    {
      name: "Haircare Essentials",
      image:
        "https://img.freepik.com/premium-photo/set-black-luxury-cosmetic-product-spray-oil-tube-cream-bottle-dispenser-lotion-shampoo-gel-showe_1358627-22656.jpg?w=360",
    },
    {
      name: "Nailcare Boutique",
      image:
        "https://img.freepik.com/premium-photo/close-up-persons-hand-with-black-nails-black-lace-design_1035785-12667.jpg?w=360",
    },
    {
      name: "On Seasonal Trends",
      image:
        "https://img.freepik.com/free-photo/medium-shot-cool-woman-posing_23-2149267439.jpg?t=st=1729664030~exp=1729667630~hmac=f85e167f38237fa0c98d1eebae0be7915f4f22036442953b9c667d7750434976&w=360",
    },
    {
      name: "Gothic Wardrobe",
      image:
        "https://img.freepik.com/premium-photo/redhaired-gothic-girl-black-dress-gloomy-background-studio_81340-30613.jpg?w=360",
    },
    {
      name: "Fashion Accessories",
      image:
        "https://img.freepik.com/premium-photo/flat-lay-top-view-bag-with-accessories-footwear-black_113876-1687.jpg?w=360",
    },
    {
      name: "Athleisure Collective",
      image:
        "https://img.freepik.com/premium-photo/portrait-young-woman-sitting-chair_1048944-5169204.jpg?w=360",
    },
  ];

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
              category={style.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Style;
