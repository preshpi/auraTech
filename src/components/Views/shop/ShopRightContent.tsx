import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { sortingArr } from "../../../utils/categories";
import Product from "../landing/product";
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { useFilter } from "../../../context/Filter.Context";
import { sortingFunc } from "../../../helper/sorting.Func";
import Empty from "../../general/Empty";
import { CategoryProp } from "../../../types/main/product";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import SkeletonProductGrid from "../soloProduct/SkeletonLoader";

interface IShopRightContentProp {
  categoryArr: CategoryProp[];
  isLoading: boolean;
}

const ShopRightContent: React.FC<IShopRightContentProp> = ({
  categoryArr,
  isLoading,
}) => {
  // HOOKS
  const [showSortBy, setShowSortBy] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const {
    handleSortBy,
    activeFilter,
    handleRemoveActiveFilter,
    priceType,
    products,
    sortBy,
    activeCat,
    handleProducts,
    handleActiveCat,
    setIsOpenDialog,
  } = useFilter();

  // FUNCTIONS
  const handleSortToggle = () => {
    setShowSortBy((prev) => !prev);
  };

  const handleDialogToggle = () => {
    setIsOpenDialog((prev) => !prev);
  };

  const handleChangeSort = (value: string) => {
    handleSortBy(value);
    handleSortToggle();

    const sorted = sortingFunc(value, products);
    if (sorted) handleProducts(sorted);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full h-full lg:px-3">
      {/* Link Direction  */}
      <div className="flex gap-x-2 my-10 items-center flex-wrap lg:px-5">
        <div className="flex gap-x-3 items-center">
          <Link
            to={"/"}
            className="capitalize font-medium text-gray-400 text-sm"
          >
            Home
          </Link>
          <p className="opacity-50 text-sm">
            <IoIosArrowForward />
          </p>
        </div>
        <div className="flex gap-x-2 items-center text-gray-400 text-sm">
          <p className="text-base opacity-90">
            <BsCart2 />
          </p>
          <p className="capitalize font-medium">shop</p>
        </div>

        {activeCat && (
          <>
            <div className="flex gap-x-3 items-center">
              <p className="opacity-50 text-sm">
                <IoIosArrowForward />
              </p>
              <p className="capitalize font-medium text-gray-400 text-sm">
                category
              </p>
              <p className="opacity-50 text-sm">
                <IoIosArrowForward />
              </p>
            </div>

            <div className="flex gap-x-3 items-center">
              <p className="capitalize font-semibold text-gray-500 text-sm">
                {activeCat ?? "N/A"}
              </p>
            </div>
          </>
        )}
      </div>
      <p className="lg:text-3xl text-xl text-center p-3 text-wheelOrange capitalize font-bold lg:hidden block">
        {!activeCat ? "all products" : activeCat ?? "N/A"}
      </p>
      {/* Title and sort  */}
      <div className="flex lg:justify-between justify-center gap-x-3 items-center mb-6 px-5">
        <p className="lg:text-3xl text-xl text-wheelOrange capitalize font-bold hidden lg:block">
          {!activeCat ? "all products" : activeCat}
        </p>

        <div className="relative lg:w-[300px] w-full flex items-center">
          <p className="text-base text-black capitalize w-[25%] lg:block hidden">
            sort by:
          </p>
          <button
            className="capitalize flex items-center px-2 justify-center rounded-md py-3 gap-x-2 lg:w-[55%] w-full bg-gray-100 border border-gray-300 text-black"
            onClick={handleSortToggle}
          >
            {sortBy === "recent"
              ? "most recent"
              : sortBy === "old"
              ? "old to new"
              : sortBy === "pasc"
              ? "price asc"
              : sortBy === "pdesc" && "price desc"}
            <span>
              <RiArrowDownSLine />
            </span>
          </button>

          {showSortBy && (
            <div className="lg:w-[55%] w-full duration-300 absolute lg:right-[60px] top-16 border-gray-100 bg-white rounded-br-lg rounded-bl-lg shadow-md divide-y divide-gray-200 z-20">
              {sortingArr?.map(({ id, text, value }) => (
                <button
                  className="capitalize text-sm w-full text-left text-black px-5 py-4"
                  onClick={() => handleChangeSort(value)}
                  key={id}
                >
                  {text}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:hidden block w-full">
          <Button
            type="button"
            onClick={handleDialogToggle}
            className="bg-black text-white"
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Filters active */}
      <div className="flex gap-x-5 mb-8">
        {activeFilter.color && (
          <div
            className="relative flex gap-x-3 items-center justify-center bg-gray-200 rounded-md py-3 px-6"
            onClick={() => handleRemoveActiveFilter("color")}
          >
            <p className="capitalize text-sm text-gray-500">
              {activeFilter.color}
            </p>
            <p className="text-sm text-gray-500 cursor-pointer">
              <LiaTimesSolid />
            </p>
          </div>
        )}

        {activeFilter.price && (
          <div
            className="relative flex gap-x-3 items-center justify-center bg-gray-200 rounded-md py-3 px-6"
            onClick={() => handleRemoveActiveFilter("price")}
          >
            <p className="capitalize text-sm text-gray-500">
              {priceType} ₦ {activeFilter.price}k
            </p>
            <p className="text-sm text-gray-500 cursor-pointer">
              <LiaTimesSolid />
            </p>
          </div>
        )}
      </div>

      <div className="w-full">
        {products.length === 0 ? (
          <div className="w-full h-[250px] flex-col flex items-center justify-center">
            <Empty
              title="no product found"
              subTitle="Product not found in this category or with the applied filter. Try
              these categories instead"
            />

            <div className="mt-6 text-center flex flex-wrap items-center justify-center w-full gap-x-6 gap-y-2 max-w-[80%]">
              {categoryArr?.map(
                ({ name, slug }, index) =>
                  slug?.current !== activeCat && (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleActiveCat(slug.current)}
                    >
                      <p
                        className={`capitalize hover:text-blue-800 transition-all duration-300 text-gray-600 text-sm underline cursor-pointer`}
                      >
                        {name}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        ) : isLoading ? (
          <SkeletonProductGrid />
        ) : (
          <>
            <div className="w-full grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((item, index) => (
                <Product key={index} productData={item} />
              ))}
            </div>
            <div className="flex justify-center gap-x-5 px-4 py-5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-white px-5 py-2 text-base rounded-md cursor-pointer hover:opacity-90 disabled:hover:opacity-100 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-primary-100 bg-primary-400"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= products.length}
                className="text-white px-5 py-2 text-base rounded-md cursor-pointer hover:opacity-90 disabled:hover:opacity-100 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-primary-100 bg-primary-400"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopRightContent;
