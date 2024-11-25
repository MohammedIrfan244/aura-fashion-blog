import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function StyleCards({ image, category }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleNavigate = (category) => {
    navigate("/styles", { state: { category } });
  };

  return (
    <div
      onClick={() => handleNavigate(category)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={ref}
      className={`h-[400px] w-80 overflow-hidden card_hover shadow-md shadow-black relative transition-all ease-in-out ${
        inView ? "animate-slideY opacity-100" : "opacity-0"
      }`}
      style={{
        animationDuration: `500ms`,
        "--tw-translate-y": "300px",
        "--tw-translate-y-70": "0px",
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-t w-full h-full from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 ${
          hover && "opacity-100"
        }`}
      ></div>
      <img
        src={image}
        alt="image"
        className={`absolute top-0 left-0 w-full h-full object-cover ${
          hover && "blur-sm brightness-75"
        }`}
      />

      
      <p
        className={`text-5xl absolute bottom-2 left-1 font-extralight z-20 ${
          hover && "text-electricBlue styleCardText"
        }`}
      >
        {category}
      </p>
      {hover&&<p className="absolute bottom-2 right-[35%] text-electricBlue animate-pulse font-agdasima z-20">Click to explore</p>}
    </div>
  );
}

export default StyleCards;
