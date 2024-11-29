import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function BoutiqueCard({ image, name }) {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleClick = () => {
    navigate(`/boutiques`, { state: { name } });
  };

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.5}
    >
      <div
        ref={ref}
        className={`h-[200px] sm:h-[400px] w-80 overflow-hidden relative hover:text-electricBlue card_hover shadow-md shadow-black bg-[#000002] hover:scale-[1.01] transition-all ease-out ${
          inView ? "animate-slideY opacity-100" : "opacity-0"
        }`}
        style={{
          animationDuration: `${500}ms`,
          "--tw-translate-y": "50px",
          "--tw-translate-y-70": "0px",
        }}
        onClick={handleClick}
      >
        <div className="w-full h-full flex justify-center items-center">
          <img src={image} alt={name} className="w-full object-cover" />
        </div>
        <p className="absolute left-5 top-3 font-extralight font-agdasima text-lg">
          {name}
        </p>
      </div>
    </Tilt>
  );
}

export default BoutiqueCard;
