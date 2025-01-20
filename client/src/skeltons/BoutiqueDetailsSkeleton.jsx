import { IoMdCloseCircleOutline } from "react-icons/io";

function BoutiqueDetailsSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 w-[90%] sm:w-[900px] h-[500px] bg-black text-white overflow-y-auto">
        <div className="flex flex-col sm:flex-row gap-1 h-auto sm:h-[400px]">
          {/* Desktop thumbnails */}
          <div className="hidden sm:flex flex-col h-full gap-1">
            {[1, 2, 3].map((index) => (
              <div key={index} className="h-1/3 w-28">
                <div className="h-full w-full bg-gray-800 animate-pulse" />
              </div>
            ))}
          </div>
          
          {/* Main image skeleton */}
          <div className="w-full sm:w-[350px] h-[400px] overflow-hidden">
            <div className="w-full h-full bg-gray-800 animate-pulse" />
          </div>

          {/* Mobile thumbnails skeleton */}
          <div className="flex sm:hidden gap-1 mt-1 h-20">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex-1 h-full">
                <div className="h-full w-full bg-gray-800 animate-pulse" />
              </div>
            ))}
          </div>

          <div className="flex-grow flex flex-col sm:ms-3 mt-2 sm:mt-0">
            <div className="flex justify-end">
              <button className="text-xl mt-1 me-1" onClick={close}>
                <IoMdCloseCircleOutline />
              </button>
            </div>
            {/* Title skeleton */}
            <div className="h-7 w-48 bg-gray-800 animate-pulse rounded -mt-6 sm:mt-0" />
            
            <div className="flex justify-between items-center mt-auto">
              {/* Checkout button skeleton */}
              <div className="h-5 w-24 bg-gray-800 animate-pulse rounded" />
              {/* Price skeleton */}
              <div className="h-6 w-16 bg-gray-800 animate-pulse rounded me-2" />
            </div>
          </div>
        </div>

        <div className="mt-5 px-1">
          {/* Comment input skeleton */}
          <div className="w-full h-8 bg-gray-800 rounded-md animate-pulse mb-3" />

          {/* Comment skeleton */}
          <div className="bg-gray-800 rounded-md p-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-gray-700 animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 animate-pulse rounded" />
            </div>
            <div className="h-4 w-full bg-gray-700 animate-pulse rounded ms-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoutiqueDetailsSkeleton;