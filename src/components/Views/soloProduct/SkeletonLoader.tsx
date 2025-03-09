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
