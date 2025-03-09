import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { ImageProp } from "../../../types/main/product";
import { urlFor } from "../../../sanity/sanity";
import NoImage from "../../general/NoImage";

type Props = {
  mainImage: ImageProp;
  otherImages: ImageProp[];
};

const SoloLeft = ({ mainImage, otherImages }: Props) => {
  // HOOKS
  const [activeImg, setActiveImg] = React.useState<{
    id: number;
    imageUrl: ImageProp;
  }>({ id: 0, imageUrl: mainImage });

  // FUNCTIONS
  const handleImageChange = (id: number, imageUrl: ImageProp) => {
    setActiveImg({ id, imageUrl });
  };

  const handleNextImage = () => {
    if (activeImg.id < 2) {
      setActiveImg({
        id: activeImg.id + 1,
        imageUrl: activeImg.id === 0 ? otherImages[0] : otherImages[1],
      });
    }
  };

  const handlePrevImage = () => {
    if (activeImg.id > 0) {
      setActiveImg({
        id: activeImg.id - 1,
        imageUrl: activeImg.id === 2 ? otherImages[0] : mainImage,
      });
    }
  };

  // STYLES
  const btnStyles = "text-gray-100 absolute text-4xl top-1/2 -translate-y-1/2";

  return (
    <div className="flex gap-x-5">
      <div className="lg:flex flex-col gap-y-5 hidden">
        <div>
          <div
            className={`w-[100px] rounded-xl h-[100px] overflow-hidden cursor-pointer ${
              activeImg.id === 0 ? "border-[2px] border-black" : "bg-gray-100"
            }`}
            onClick={() => handleImageChange(0, mainImage)}
          >
            <div></div>
            {mainImage ? (
              <img
                src={urlFor(mainImage)}
                alt={"product image"}
                width={1000}
                height={1000}
              />
            ) : (
              <NoImage />
            )}
          </div>
        </div>

        {otherImages?.map((imageUrl, index) => (
          <div key={index}>
            <div
              className={`w-[100px] rounded-xl h-[100px] overflow-hidden cursor-pointer ${
                activeImg.id === index + 1
                  ? "border-[2px] border-black"
                  : "bg-gray-100"
              }`}
              onClick={() => handleImageChange(index + 1, imageUrl)}
            >
              {imageUrl && (
                <img
                  src={urlFor(imageUrl)}
                  alt="other product"
                  width={1000}
                  height={1000}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-[400px] h-[300px] lg:h-[500px] bg-gray-200 rounded-xl overflow-hidden relative">
        {/* {activeImg.id === 0 ? ( */}
        <div className=" w-full h-full relative">
          {activeImg.imageUrl && (
            <img
              src={urlFor(activeImg.imageUrl)}
              alt="other product"
              className="object-cover"
            />
          )}
        </div>

        {otherImages?.length > 0 && (
          <>
            {/* Left arrow  */}
            {activeImg.id > 0 && (
              <button
                className={`left-5 rotate-180 absolute ${btnStyles}`}
                onClick={handlePrevImage}
              >
                <IoIosArrowDroprightCircle />
              </button>
            )}

            {/* Right arrow  */}
            {activeImg.id !== 2 && (
              <button
                className={`right-5 absolute ${btnStyles}`}
                onClick={handleNextImage}
              >
                <IoIosArrowDroprightCircle />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SoloLeft;
