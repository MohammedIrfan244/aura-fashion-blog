import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function StyleCards({ image, category }) {
  const navigate = useNavigate();
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
    ref={ref}
    className={`h-[400px] w-80 overflow-hidden card_hover shadow-md shadow-black relative hover:text-electricBlue cursor-pointer transition-all ease-in-out duration-75 ${
      inView ? "animate-slideY opacity-100" : "opacity-0"
    }`}
    style={{
      animationDuration: `500ms`,
      "--tw-translate-y": "300px",
      "--tw-translate-y-70": "0px",
    }}
    >
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
      <img
        src={image}
        alt="image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      

      <p className="font-agdasima absolute top-1 left-2 text-xl text-electricBlue z-20">
        A
      </p>
      <p className="text-5xl absolute bottom-2 left-1 font-extralight z-20">
        {category}
      </p>
    </div>
  );
}

export default StyleCards;
