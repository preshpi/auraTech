import React from "react";
import { ProductProp } from "../../../types/main/product";
import { Link, useNavigate } from "react-router-dom";
import { MainPageSkeletonLoader } from "./SkeletonLoader";
import SoloTop from "./SoloTop";
import SoloLeft from "./SoloLeft";
import SoloRight from "./SoloRight";

interface ISoloContentProps {
  soloProductData: ProductProp;
  isLoading: boolean;
}

const SoloContent: React.FunctionComponent<ISoloContentProps> = ({
  soloProductData,
  isLoading,
}) => {
  // HOOKS
  const router = useNavigate();

  return (
    <div className="w-full h-full py-10  mx-auto max-w-[1240px] px-5 lg:px-20">
      {soloProductData === null ? (
        <div className="max-w-[500px] mx-auto h-[60vh] flex-col gap-5 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dpokiomqq/image/upload/v1726753640/no-results_iqfd2e.png"
            alt="No results"
            width={100}
            height={100}
          />
          <div className="text-center">
            <p className="font-bold text-black text-[20px]">
              Sorry, we could not find this product
            </p>
            <p className="text-gray-500 text-base mt-2">
              Please check the link and try again
            </p>
          </div>

          <div className="gap-3 px-5 w-full flex lg:flex-row md:flex-row flex-col items-center">
            <Link
              to="/shop"
              className="border border-black w-full hover:opacity-65 transition-all duration-300 hover:bg-gray-50  h-full text-center rounded-xl capitalize px-6 py-3 text-black"
            >
              Continue shopping
            </Link>
            <button
              onClick={() => router(-1)}
              className="bg-black rounded-xl w-full hover:opacity-95 transition-all duration-300 text-white px-6 py-3 capitalize"
            >
              go back
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <MainPageSkeletonLoader />
      ) : (
        <>
          {/* Link Direction  */}
          <div className="flex gap-x-3 items-center">
            <SoloTop
              product_name={soloProductData.product_name}
              category={soloProductData.categories[0].slug.current}
            />
          </div>

          <div className="flex gap-5 lg:flex-row flex-col lg:justify-between justify-center ">
            {/* Left  */}
            <div className="w-full lg:w-1/2 py-3">
              <SoloLeft
                mainImage={soloProductData.imgUrl}
                otherImages={soloProductData.otherImages}
              />
            </div>

            {/* Right  */}
            <div className="w-full lg:w-1/2 py-3 relative">
              <SoloRight productData={soloProductData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SoloContent;
