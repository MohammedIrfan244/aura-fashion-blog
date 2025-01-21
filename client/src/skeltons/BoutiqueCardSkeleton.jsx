import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

function BoutiqueCardSkeleton() {
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
        <div className="h-[200px] sm:h-[400px] w-80 overflow-hidden relative shadow-md shadow-black bg-[#000002] transition-all ease-out">
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-full h-full bg-gray-800 animate-pulse" />
          </div>

          <div className="absolute left-5 top-3">
            <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default BoutiqueCardSkeleton;
