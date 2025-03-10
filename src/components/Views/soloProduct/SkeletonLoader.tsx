import Skeleton from "react-loading-skeleton";

export const MainPageSkeletonLoader = () => {
  // STYLES
  const loaderStyle = "w-1/2 h-[500px] rounded-2xl overflow-hidden p-0";
  return (
    <>
      <div className="mt-5 h-8 w-[400px] mb-10">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      <div className="flex gap-x-10">
        {/* Left  */}
        <div className={loaderStyle}>
          <Skeleton className="w-full h-full" />
        </div>

        {/* Right  */}
        <div className={loaderStyle}>
          <Skeleton className="w-full h-full " />
        </div>
      </div>
    </>
  );
};

export const SkeletonCategory = () => {
  return (
    <div className="flex-shrink-0 w-[250px] mx-2 animate-pulse">
      <div className="flex flex-col items-center justify-start bg-[#F9F9F9] rounded-md w-full p-4 h-[320px]">
        <div className="w-full h-[200px] bg-gray-200 rounded-md"></div>

        <div className="flex items-center justify-between w-full py-2">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductSkeletonLoader = () => {
  return (
    <div className="lg:w-[266px] w-full rounded-md mx-auto bg-[#f9f9f9] h-[full] relative lg:rounded-md overflow-hidden animate-pulse">
      {/* Image */}
      <div className="w-full h-[300px] bg-gray-300 rounded-md"></div>

      <div className="absolute top-3 right-3 flex flex-col gap-y-4 z-20">
        <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>
        <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export const SkeletonProductGrid = () => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 h-[300px] rounded-md mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export const SoloContentSkeleton = () => {
  return (
    <div className="w-full h-full py-10 mx-auto max-w-[1240px] px-5 lg:px-20">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="flex gap-5 lg:flex-row flex-col lg:justify-between justify-center">
          <div className="h-64  lg:w-1/2 py-3 bg-gray-300 rounded mb-4"></div>
          <div className="w-full lg:w-1/2 py-3">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShopContentSkeleton = () => {
  return (
    <div className="w-full h-full py-10 mx-auto max-w-[1240px] px-5 lg:px-1">
      <div className="animate-pulse flex space-x-4">
        <div className="h-[600px] bg-gray-200 w-96 lg:block hidden"></div>
        <SkeletonProductGrid />
      </div>
    </div>
  );
};
