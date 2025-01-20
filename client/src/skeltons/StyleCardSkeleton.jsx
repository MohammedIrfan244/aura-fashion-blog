import { motion } from 'framer-motion';

function StyleCardSkeleton() {
  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 1,
        repeat: 0,
      }}
      className="h-[400px] w-80 overflow-hidden shadow-md shadow-black relative bg-gray-800"
    >
      {/* Skeleton for the image */}
      <div className="absolute inset-0 w-full h-full bg-gray-700 animate-pulse" />

      {/* Skeleton for the title text */}
      <div className="absolute bottom-2 left-1 z-20">
        <div className="h-12 w-48 bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Skeleton for the "Click to explore" text */}
      <div className="absolute bottom-2 right-[37%] z-20">
        <div className="h-6 w-24 bg-gray-700 rounded animate-pulse" />
      </div>
    </motion.div>
  );
}

export default StyleCardSkeleton;