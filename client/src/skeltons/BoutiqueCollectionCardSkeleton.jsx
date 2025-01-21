import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

function BoutiqueCollectionCardSkeleton() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, repeat: 0 }}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.5}
        className={blur ? "blur-sm" : "blur-0 shadow-md shadow-black"}
      >
        <div className="h-[350px] w-80 overflow-hidden bg-[#000002] transition-all ease-out">
          <div className="w-full h-full bg-gray-800 animate-pulse" />
        </div>

        <div className="h-6 w-32 bg-gray-800 rounded animate-pulse mt-2 font-agdasima" />

        <div className="h-7 w-20 bg-gray-800 rounded animate-pulse mt-1 font-agdasima" />
      </Tilt>
    </motion.div>
  );
}

export default BoutiqueCollectionCardSkeleton;
