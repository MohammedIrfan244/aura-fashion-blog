import { motion } from "framer-motion";

function StyleCollectionCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row relative w-auto h-auto">
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, repeat: 0 }}
        className="w-full sm:w-1/2 h-[80vh] sm:h-[100vh] bg-gray-800 animate-pulse"
      />

      <div className="pt-10 ps-3 w-full sm:w-1/2">
        <div className="flex items-center gap-5">
          <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, repeat: 0 }}
          className="sm:bg-[#242427] sm:absolute sm:top-[10%] sm:left-[45%] overflow-hidden h-auto sm:py-5 w-auto sm:px-20 flex items-center"
        >
          <div className="h-8 sm:h-12 w-48 bg-gray-700 rounded animate-pulse mt-5 sm:mt-0" />
        </motion.div>

        <div className="mt-5 sm:mt-40 flex items-center gap-2">
          <div className="h-4 w-8 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="space-y-2 mt-5">
          <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-700 rounded animate-pulse" />
        </div>

        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.1, repeat: 0 }}
          className="h-8 w-28 bg-gray-700 rounded animate-pulse mt-5"
        />
      </div>
    </div>
  );
}

export default StyleCollectionCardSkeleton;
