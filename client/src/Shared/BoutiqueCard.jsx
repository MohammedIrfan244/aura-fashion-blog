import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
function BoutiqueCard({ image, name, title }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/boutiques?brand=${name}`, { state: { name } });
  };

  return (
    <motion.div
      initial={{ rotateX: 70, y: 100, opacity: 0 }}
      whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.5, repeat: 0 }}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.5}
      >
        <div
          className="h-[200px] sm:h-[400px] w-80 overflow-hidden relative hover:text-electricBlue shadow-md shadow-black bg-[#000002] hover:scale-[1.01] transition-all ease-out"
          onClick={handleClick}
        >
          <div className="w-full h-full flex justify-center items-center">
            <img src={image} alt={name} className="w-full object-cover" />
          </div>
          <p className="absolute left-5 top-3 font-extralight font-agdasima text-lg">
            {title}
          </p>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default BoutiqueCard;
