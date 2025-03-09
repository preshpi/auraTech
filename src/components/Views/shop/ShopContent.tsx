"use client";
import * as React from "react";
import LeftFilterBar from "./LeftFilterBar";
import {
  CategoryProp,
  ColorSizeProp,
  ProductProp,
} from "../../../types/main/product";
import { useSearchParams } from "react-router-dom";
import { useFilter } from "../../../context/Filter.Context";
import ShopRightContent from "./ShopRightContent";

interface IShopContentProp {
  productsArr: ProductProp[];
  colorArr: ColorSizeProp[];
  categoryArr: CategoryProp[];
}

const ShopContent: React.FC<IShopContentProp> = ({
  productsArr,
  colorArr,
  categoryArr,
}) => {
  // HOOKS
  const {
    handleActiveCat,
    handleProducts,
    handleOriginalProducts,
    isOpenDialog,
    setIsOpenDialog,
  } = useFilter();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  // DECLARES
  const searchParamsVal = searchParams.get("cat");

  // USE EFFECTS
  React.useEffect(() => {
    if (searchParamsVal) {
      handleActiveCat(searchParamsVal);
    }
  }, [searchParamsVal]);

  React.useEffect(() => {
    if (productsArr) {
      handleOriginalProducts(productsArr);
      handleProducts(productsArr);
    }
  }, [productsArr]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpenDialog(false);
      }
    };

    if (isOpenDialog) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDialog, setIsOpenDialog]);

  return (
    <div className="flex mx-auto max-w-[1140px] lg:p-10 ">
      {/* Left  */}
      <div className="hidden no-scrollbar lg:block fixed lg:sticky border-r  border-gray-300 w-[30%] h-full pb-10 overflow-y-auto">
        <LeftFilterBar categoryArr={categoryArr} colorArr={colorArr} />
      </div>

      {/* Dialog */}
      {isOpenDialog && (
        <div
          ref={dialogRef}
          className="h-full overflow-auto  no-scrollbar border-slate-300 fixed bg-opacity-90 top-0 bg-slate-50 border-none backdrop-blur-md z-[99] w-[260px] shadow-md p-5"
        >
          <LeftFilterBar categoryArr={categoryArr} colorArr={colorArr} />
        </div>
      )}

      {/* Right  */}
      <div
        className={` ${
          isOpenDialog ? "blurred pointer-events-none" : ""
        }   h-full lg:px-0 px-6 flex w-full flex-col `}
      >
        <ShopRightContent categoryArr={categoryArr} />
      </div>
    </div>
  );
};

export default ShopContent;
