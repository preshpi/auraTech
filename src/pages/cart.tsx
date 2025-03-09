import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft, GoPlus } from "react-icons/go";
import Empty from "../components/general/Empty";
import { useAppSelector } from "../hooks/redux.hook";
import { useDispatch } from "react-redux";
import {
  handleClearCart,
  handleIncreaseProductQuantity,
  handleReduceProductQuantity,
  handleRemoveItemFromCart,
} from "../redux/slices/cartSlice";
import { urlFor } from "../sanity/sanity";
import NoImage from "../components/general/NoImage";
import { HiMinus, HiOutlineInformationCircle } from "react-icons/hi";
import { Button } from "../components/ui/button";
import NumberFormat from "../helper/numberFormat";
import { CartUniqueProp } from "../types/main/cart";
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartProducts = useAppSelector((state) => state.cart.products);
  const productTotalPrice = useAppSelector(
    (state) => state.cart.products_total_price
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCartClearing = () => {
    dispatch(handleClearCart());
  };

  const handleReduce = ({ _id, color }: CartUniqueProp) => {
    dispatch(handleReduceProductQuantity({ _id, color }));
  };

  const handleIncrease = ({ _id, color }: CartUniqueProp) => {
    dispatch(handleIncreaseProductQuantity({ _id, color }));
  };

  const handleRemoveItem = ({ _id, color }: CartUniqueProp) => {
    dispatch(handleRemoveItemFromCart({ _id, color }));
  };

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  const productUnavailable = cartProducts.some(
    (item) => item.status === "outOfStock"
  );

  return (
    <div className="lg:px-20 px-5 max-w-[1240px] mx-auto flex flex-col w-full h-full">
      <div className="pt-10">
        <button className="flex item-center gap-3" onClick={() => navigate(-1)}>
          <span className="my-auto">
            <GoArrowLeft />
          </span>
          Go back
        </button>
      </div>

      <div className="pt-10">
        {cartItems === 0 ? (
          <div className="w-full h-[400px] px-5 flex-col flex items-center justify-center">
            <Empty
              title="Cart Empty"
              subTitle="Your cart is currently empty. Try
            adding product from shop"
              imgUrl="https://res.cloudinary.com/dgdoymhtj/image/upload/v1710961534/tytn/announcements/emptyCart_II-removebg-preview_pdwcgu.png"
            />

            <Link to={"/shop"} className="text-sm underline text-black mt-4">
              Go to shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-between items-center border-b  border-gray-300 py-3">
              <h3 className="text-[18px] font-bold">Your bag</h3>
              <div className="flex items-center gap-x-3">
                <p>
                  {cartItems} Item{cartItems > 1 ? "(s)" : ""}
                </p>
                <button
                  onClick={handleCartClearing}
                  className="capitalize text-red-500 text-sm px-3 font-medium"
                >
                  clear cart
                </button>
              </div>
            </div>

            <div className="w-full flex h-full lg:flex-row flex-col lg:justify-between justify-center gap-12 items-start py-5">
              {/* product summary */}
              <div className="flex-1 flex-col h-full lg:w-3/5 w-full overflow-y-auto">
                {cartProducts.map(
                  (
                    { _id, total_price, name, imgUrl, color, quantity, status },
                    index
                  ) => {
                    const isOutOfStock = status === "outOfStock";

                    return (
                      <div
                        className={`flex justify-between h-full first:pt-0 gap-3 py-5 ${
                          index !== cartProducts.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                        key={index}
                      >
                        <div
                          className={` h-full w-full flex items-start gap-3 justify-start`}
                        >
                          {imgUrl && (
                            <div
                              className={`"h-full w-52 rounded-md overflow-hidden  ${
                                isOutOfStock ? "opacity-50" : ""
                              }`}
                            >
                              {isOutOfStock ? (
                                <>
                                  {imgUrl ? (
                                    <img
                                      src={urlFor(imgUrl)}
                                      alt={name}
                                      width={1000}
                                      height={1000}
                                      className="object-cover"
                                    />
                                  ) : (
                                    <NoImage />
                                  )}
                                </>
                              ) : (
                                <>
                                  <Link to={`/shop/${_id}`}>
                                    {imgUrl ? (
                                      <img
                                        src={urlFor(imgUrl)}
                                        alt={name}
                                        width={1000}
                                        height={1000}
                                        className="object-cover"
                                      />
                                    ) : (
                                      <NoImage />
                                    )}{" "}
                                  </Link>
                                </>
                              )}
                            </div>
                          )}

                          <div className="h-full w-full flex flex-col items-start gap-3">
                            <div
                              className={` ${isOutOfStock ? "opacity-50" : ""}`}
                            >
                              <h3
                                className={`font-semibold text-[18px] transition-all duration-300 ${
                                  isOutOfStock
                                    ? "text-opacity-80"
                                    : "hover:underline"
                                }`}
                              >
                                {isOutOfStock ? (
                                  <span>{name}</span>
                                ) : (
                                  <Link to={`/shop/${_id}`}>{name}</Link>
                                )}
                              </h3>
                              <div className="flex gap-3 flex-col mt-3">
                                <NumberFormat
                                  value={total_price || 0}
                                  className="text-gray-700"
                                />

                                <span
                                  className="w-6 h-6 rounded-full border border-gray-400"
                                  style={{ background: color }}
                                ></span>
                              </div>
                            </div>
                            {isOutOfStock ? (
                              <div className="flex items-start justify-start text-red-400 text-sm gap-x-2 w-full">
                                {" "}
                                <HiOutlineInformationCircle className="mt-1" />
                                <p>Item is currently out of stock</p>{" "}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* plus, minus, delete button */}
                        <div className="flex items-center flex-col gap-y-3">
                          <button
                            onClick={() => handleIncrease({ _id, color })}
                            disabled={isOutOfStock}
                            className="border p-2 rounded-full bg-black text-white disabled:bg-opacity-80"
                          >
                            <GoPlus />
                          </button>
                          <span
                            className={`  ${isOutOfStock ? "opacity-80" : ""}`}
                          >
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleReduce({ _id, color })}
                            disabled={isOutOfStock}
                            className="border border-[#979797] p-2 rounded-full text-[#979797] disabled:bg-opacity-80"
                          >
                            <HiMinus />
                          </button>
                          <button
                            onClick={() => handleRemoveItem({ _id, color })}
                            className="text-red-700"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* checkout */}
              <div className="lg:w-2/5 w-full flex flex-col gap-5 p-5 sticky top-0 bg-gray-50 text-black border border-100">
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Sub Total</p>
                  <NumberFormat
                    value={`${productTotalPrice}` || 0}
                    onlyNaira
                    className="font-medium"
                  />
                </div>

                <hr className="border-[0.5px] border-black w-full" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Total</p>
                  <NumberFormat
                    value={`${productTotalPrice}` || 0}
                    className="font-medium"
                    onlyNaira
                  />
                </div>

                <Link to={productUnavailable ? "#" : "/checkout"}>
                  <Button
                    type="button"
                    onClick={
                      productUnavailable ? undefined : handleGoToCheckout
                    }
                    className={`text-white bg-black ${
                      productUnavailable ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={productUnavailable}
                  >
                    Proceed to checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
