import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

// eslint-disable-next-line react/prop-types
function BoutiqueCollectionCard({ boutique = {}, click,blur=false }) {
  return (
    <motion.div
    initial={{ y:100, opacity: 0 }}
    whileInView={{y:0, opacity: 1 }}
    transition={{ duration: 0.5, repeat: 0 }}
    >
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.5}
      className={blur ? "blur-sm" : "blur-0 shadow-md shadow-black"}
    >
      <div
        onClick={click}
        className="h-[350px] w-80 overflow-hidden text-richBlack font-semibold bg-[#000002] transition-all ease-out "
      >
        <img
          src={boutique?.firstImage}
          alt={boutique?.name}
          className="w-full h-full object-cover hover:scale-[1.02] transition-all ease-out"
        />
      </div>
      <p className="font-agdasima">{boutique?.name}</p>
      <p className="text-xl font-agdasima">$ {boutique?.price}</p>
    </Tilt>
    </motion.div>
  );
}

export default BoutiqueCollectionCard;
