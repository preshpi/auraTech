import { useFilter } from "../../../context/Filter.Context";
import {
  filterProductsByCategory,
  sortingFunc,
} from "../../../helper/sorting.Func";
import { CategoryProp, ColorSizeProp } from "../../../types/main/product";
import { priceArr } from "../../../utils/categories";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as React from "react";
import { BiCheck, BiTrash } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

interface ILeftFilterBarProps {
  colorArr: ColorSizeProp[];
  categoryArr: CategoryProp[];
  isCategoryLoading: boolean;
  isColorLoading: boolean;
}

const LeftFilterBar: React.FunctionComponent<ILeftFilterBarProps> = ({
  categoryArr,
  colorArr,
}) => {
  // HOOKS
  const {
    activeCat,
    handleActiveCat,
    activeFilter,
    handleActiveFilter,
    clearActiveFilter,
    handleRemoveActiveFilter,
    handlePriceType,
    priceType,
    originalProductsData,
    handleProducts,
    sortBy,
    priceRange,
    setPriceRange,
    handleApplyFilter,
    priceErr,
  } = useFilter();
  const [activeColor, setActiveColor] = React.useState<string>(
    activeFilter.color || ""
  );

  const [activePrice, setActivePrice] = React.useState<number | null>(
    activeFilter.price || null
  );
  const [showColor, setShowColor] = React.useState<boolean>(false);
  const [showPrice, setShowPrice] = React.useState<boolean>(false);

  // DECLARES
  const searchParams = useSearchParams();
  const router = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const showButtons =
    !activeFilter.color &&
    !activeFilter.price &&
    priceRange.max === 0 &&
    priceRange.min === 0;

  //   FUNCTIONS
  const handleCategory = (props: string) => {
    handleActiveCat(props);
    router(pathname + "?" + createQueryString("cat", props));
  };

  const handleColor = (color: string) => {
    if (activeColor === color) {
      setActiveColor("");
      handleActiveFilter(color, "");
      handleRemoveActiveFilter("color");
    } else {
      setActiveColor(color);
      handleActiveFilter(color, "color");
    }
  };

  const handlePrice = (price: number, priceType: string) => {
    if (activePrice === price) {
      handleActiveFilter(price, "");
      handleRemoveActiveFilter("price");
    } else {
      setActivePrice(price);
      handleActiveFilter(price, "price");
      handlePriceType(priceType);
      setPriceRange({ min: 0, max: 0 });
    }
  };

  const handleToggleColor = () => {
    setShowColor((prev) => !prev);
  };

  const handleTogglePrice = () => {
    setShowPrice((prev) => !prev);
  };

  const handlePiceVal = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const changeToNumber = Number(e.target.value);
    switch (type) {
      case "min":
        setPriceRange({ ...priceRange, min: changeToNumber });
        break;
      case "max":
        setPriceRange({ ...priceRange, max: changeToNumber });
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    setActiveColor("");
    setActivePrice(null);
    setPriceRange({ min: 0, max: 0 });
    clearActiveFilter();

    const res = filterProductsByCategory(originalProductsData, activeCat);
    if (sortBy) {
      const sorted = sortingFunc(sortBy, res);
      if (sorted) {
        handleProducts(sorted);
      }
    }
  };

  //   USE EFFECTS
  React.useEffect(() => {
    if (priceRange.min > 0 || priceRange.max > 0) {
      const findPrice = activeFilter.price === activePrice;
      if (
        (findPrice && priceRange.min > 0) ||
        (findPrice && priceRange.max > 0)
      ) {
        handleRemoveActiveFilter("price");
      }
      setActivePrice(null);
    }
  }, [priceRange, activeFilter.price, activePrice]);

  React.useEffect(() => {
    if (activeFilter) {
      const findColor = activeFilter.color === activeColor;
      const findPrice = activeFilter.price === activePrice;

      if (!findColor) {
        setActiveColor("");
      }

      if (!findPrice) {
        setActivePrice(null);
      }
    }
  }, [activeFilter, activeColor, activePrice]);

  return (
    <div className="space-y-5 pb-12">
      {/* Category */}
      <div className="pr-3">
        <p className="text-base font-bold capitalize">category</p>
        <div className="pb-5 space-y-5 mt-5 duration-300 border-b border-b-gray-300">
          <div className="cursor-pointer" onClick={() => handleCategory("")}>
            <p
              className={`capitalize ${
                activeCat === "" ? "text-black font-semibold" : "text-gray-600"
              } text-sm`}
            >
              all products
            </p>
          </div>
          {categoryArr?.map(({ name, slug }, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleCategory(slug.current)}
            >
              <p
                className={`capitalize ${
                  slug?.current === activeCat
                    ? "text-black font-semibold"
                    : "text-gray-600"
                } text-sm`}
              >
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pr-3">
        <p className="text-base font-bold">Filter by :</p>
        <>
          {/* Colors */}
          <div className="">
            <div
              className="mt-5 relative flex justify-between items-center cursor-pointer"
              onClick={handleToggleColor}
            >
              <p className="text-sm font-bold capitalize">color</p>
              <p
                className={`${
                  showColor ? "rotate-180" : "rotate-0"
                } duration-300`}
              >
                <IoIosArrowDown />
              </p>
            </div>

            {showColor && (
              <div className="mt-3 space-y-3">
                {colorArr.map(({ title }, index) => (
                  <div
                    className="flex items-center gap-x-2"
                    key={index}
                    onClick={() => handleColor(title)}
                  >
                    <div
                      className={`w-4 h-4 rounded cursor-pointer relative ${
                        activeColor === title
                          ? "bg-black"
                          : "border border-gray-300"
                      }`}
                    >
                      {activeColor === title && (
                        <p className="text-sm text-white">
                          <BiCheck />
                        </p>
                      )}
                    </div>
                    <p className="capitalize text-sm text-gray-600">{title}</p>
                    <div
                      className="w-7 h-2 rounded"
                      style={{ background: title }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prices  */}
          <div className="border-b border-b-gray-300 pb-5">
            <div
              className="mt-5 relative flex justify-between items-center cursor-pointer"
              onClick={handleTogglePrice}
            >
              <p className="text-sm font-bold capitalize">price</p>
              <p
                className={`${
                  showPrice ? "rotate-180" : "rotate-0"
                } duration-300`}
              >
                <IoIosArrowDown />
              </p>
            </div>

            {showPrice && (
              <div className="mt-3 space-y-3">
                {priceArr.map(({ amount, type }, index) => (
                  <div
                    className="flex items-center gap-x-2"
                    key={index}
                    onClick={() => handlePrice(amount, type)}
                  >
                    <div
                      className={`w-4 h-4 rounded cursor-pointer relative ${
                        activePrice === amount && priceType === type
                          ? "bg-black"
                          : "border border-gray-300"
                      }`}
                    >
                      {activePrice === amount && priceType === type && (
                        <p className="text-sm text-white">
                          <BiCheck />
                        </p>
                      )}
                    </div>
                    <p className="capitalize text-sm text-gray-600">
                      {type === "below"
                        ? `below ₦ ${amount}k`
                        : `above ₦ ${amount}k`}
                    </p>
                  </div>
                ))}
                <div className="flex items-center justify-between w-full">
                  <div className="space-y-1">
                    <p className="text-sm">min</p>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePiceVal(e, "min")}
                      placeholder="5000"
                      className="w-[80px] px-3 py-2 rounded bg-gray-200 text-black focus:outline-none text-sm"
                    />
                  </div>
                  <p className="text-xl mt-6">-</p>
                  <div className="space-y-1">
                    <p className="text-sm">max</p>
                    <input
                      type="number"
                      value={priceRange.max}
                      placeholder="15000"
                      className="w-[80px] px-3 py-2 rounded bg-gray-200 text-black focus:outline-none text-sm"
                      onChange={(e) => handlePiceVal(e, "max")}
                    />
                  </div>
                </div>
              </div>
            )}

            {priceErr && (
              <p className="text-sm text-red-500 pt-2">
                maximum price can&apos;t be less than minimum price
              </p>
            )}
          </div>

          {/* Apply or Delete  */}
          <div className="flex items-center gap-x-3 mt-5">
            <button
              className={`px-10 py-3 rounded-md ${
                showButtons
                  ? "bg-gray-200 text-black cursor-not-allowed"
                  : "bg-black text-white"
              } capitalize`}
              onClick={handleApplyFilter}
              disabled={showButtons}
            >
              apply
            </button>
            {!showButtons && (
              <button
                className="py-3 px-5 rounded-md text-xl bg-gray-200 text-gray-600"
                onClick={handleDelete}
              >
                <BiTrash />
              </button>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default LeftFilterBar;
