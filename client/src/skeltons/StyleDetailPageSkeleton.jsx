import GoTopPopUp from "../Utilities/GoTop";

function StyleDetailPageSkeleton() {
  return (
    <div className="pt-16 px-5 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex bg-[#242427] h-14 sm:h-20 items-center gap-5 justify-center text-sm animate-slideY">
        <p className="flex items-center gap-2">
          <span className="h-4 w-4 bg-gray-700 rounded-full animate-pulse"></span>
          <span className="h-4 w-16 bg-gray-700 rounded animate-pulse"></span>
        </p>
        <p className="flex font-semibold items-center gap-2">
          <span className="h-4 w-4 bg-gray-700 rounded-full animate-pulse"></span>
          <span className="h-4 w-24 bg-gray-700 rounded animate-pulse"></span>
        </p>
        <p className="flex items-center gap-2">
          <span className="h-4 w-4 bg-gray-700 rounded-full animate-pulse"></span>
          <span className="h-4 w-10 bg-gray-700 rounded animate-pulse"></span>
        </p>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-col items-center mt-5 gap-5 sm:gap-10">
        {/* Title Skeleton */}
        <div className="h-8 w-3/4 bg-gray-700 rounded animate-pulse"></div>
        <div className="sm:w-2/3 h-5 bg-gray-700 rounded animate-pulse"></div>

        {/* Image Skeleton */}
        <div className="sm:w-3/5 h-80 bg-gray-800 animate-pulse"></div>

        {/* Subtitle Skeleton */}
        <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse"></div>

        {/* Content Sections Skeleton */}
        <div className="w-full sm:w-2/3 flex flex-col gap-5 sm:gap-10">
          {[...Array(3)].map((_, i) => (
            <div className="flex flex-col gap-3" key={i}>
              <div className="h-5 w-1/3 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
          <div className="text-xs text-right font-semibold">
            <div className="h-4 w-1/3 bg-gray-700 rounded animate-pulse ml-auto"></div>
          </div>
        </div>
        <GoTopPopUp />
      </div>
    </div>
  );
}

export default StyleDetailPageSkeleton;
