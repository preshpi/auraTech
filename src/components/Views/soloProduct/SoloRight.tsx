import React from "react";
import { BsCart2 } from "react-icons/bs";
import { toast } from "sonner";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { ProductProp } from "../../../types/main/product";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { handleAddToCart } from "../../../redux/slices/cartSlice";
import NumberFormat from "../../../helper/numberFormat";
import { Button } from "../../ui/button";
import { getColorCode } from "../../../helper/validationCheck";

type Props = {
  productData: ProductProp;
};

const SoloRight = ({ productData }: Props) => {
  // HOOKS
  const [clothProp, setClothProp] = React.useState<{
    color: string;
  }>({ color: productData.colors[0].title });
  const [quantity, setQuantity] = React.useState<number>(1);
  const [initialPrice] = React.useState<number>(productData.price);
  const [newPrice, setNewPrice] = React.useState<number>(initialPrice);
  const dispatch = useAppDispatch();

  const outOfStock = productData.status === "outOfStock";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("link copied to clipboard");
  };

  const handleColor = (color: string) => {
    setClothProp((prev) => ({ ...prev, color }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quan = Number(e.target.value);
    setQuantity(quan);
  };

  const addToCartFunc = () => {
    const product = {
      _id: productData._id,
      price: productData.price,
      quantity,
      imgUrl: productData.imgUrl,
      name: productData.product_name,
      color: clothProp.color,
      total_price: 0,
      status: productData.status,
    };
    dispatch(handleAddToCart(product));
    toast.success("item added to cart");
  };

  const productURL = `http://localhost:5173/shop/${productData._id}`;

  // USE EFFECTS
  React.useEffect(() => {
    if (quantity !== 0) {
      setNewPrice(quantity * initialPrice);
    }
  }, [quantity]);

  // STYLES
  const pidStyle = "text-sm capitalize font-medium relative z-10";
  const priceStyle = "text-black capitalize relative z-10";
  // const qunBtnStyle = "border w-full";
  // "w-[50px] bg-black text-white rounded-md text-center py-1 text-2xl";

  return (
    <div className="flex lg:flex-row flex-col lg:justify-between justify-center w-full">
      <div className="flex flex-col gap-y-5">
        <p className="text-sm font-medium text-gray-500 capitalize">
          {productData.product_desc}
        </p>

        <p className="font-bold text-black capitalize text-3xl">
          {productData.product_name}
        </p>

        {/* Price  */}

        <NumberFormat
          value={newPrice || 0}
          className={`${priceStyle} text-3xl font-semibold`}
        />

        {/* Product ID  */}
        <div className="flex items-center gap-x-10  text-black">
          <p className={`${pidStyle} w-[100px]`}>product code:</p>
          <p className={`${pidStyle} text-[#454545]`}>{productData._id}</p>
        </div>

        {/* Status  */}
        <div className="flex items-center gap-x-10">
          <p className={`${pidStyle} w-[100px] text-base font-medium`}>
            Status:
          </p>
          <p
            className={`${pidStyle} ${
              productData.status === "inStock"
                ? "text-green-500"
                : productData.status === "outOfStock"
                ? "text-orange-500"
                : productData.status === "discontinued"
                ? "text-red-500"
                : "text-black"
            } text-3xl font-bold capitalize`}
          >
            {productData.status === "inStock"
              ? "in stock"
              : productData.status === "outOfStock"
              ? "out of stock"
              : productData.status}
          </p>
        </div>

        {/* colors  */}
        <div className="flex items-center gap-x-10">
          <p className={`${pidStyle} w-[100px] text-base font-medium`}>
            Colors:
          </p>
          <div className="flex flex-col items-start gap-y-3">
            <div className="flex gap-x-3 relative">
              <div className="absolute inset-0 bg-gray-200 blur-xl z-0" />
              {productData.colors.map(({ _id, title }) => (
                <div className="space-y-1 relative z-10" key={_id}>
                  <div
                    className={`${
                      title === clothProp.color
                        ? "border-[black] border-2"
                        : "border border-gray-400"
                    } p-[2px] rounded-full w-[30px] h-[30px] flex items-center justify-center`}
                  >
                    <button
                      className={`w-full h-full rounded-full`}
                      style={{ backgroundColor: getColorCode(title) }}
                      onClick={() => handleColor(title)}
                    ></button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#222] italic">
              you&apos;ve picked: {clothProp.color}
            </p>
          </div>
        </div>

        {/* quantity  */}
        <div className="flex gap-x-10 items-center">
          <p className={`${pidStyle} w-[100px] text-base font-medium`}>
            quantity:
          </p>

          <div className="flex gap-x-2 border border-gray-300">
            <button onClick={handleDecrement} className="border-r px-3">
              -
            </button>

            <input
              value={quantity}
              type="number"
              onChange={(e) => handleQuantity(e)}
              className="appearance-none focus:outline-none w-[30px] text-center py-1 bg-white text-lg flex items-center justify-center"
            />

            <button onClick={handleIncrement} className="border-l px-3">
              +
            </button>
          </div>
        </div>

        {/* buttons  */}
        <div className="flex items-center w-full gap-x-3 mt-2">
          <Button
            type="button"
            className={`${
              outOfStock ? "disabled:cursor-not-allowed" : ""
            } w-[350px] md:w-full py-4 bg-black flex gap-x-2 items-center justify-center text-sm text-white capitalize`}
            onClick={addToCartFunc}
            // disabled={outOfStock}
          >
            <BsCart2 className="text-xl" />
            <span>add to cart</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center lg:mt-0 mt-6 gap-y-4 items-center">
        <p className="text-xs font-medium text-black">Share</p>
        <div className="flex flex-row lg:flex-col gap-6 text-black text-xl items-center justify-center">
          <FacebookShareButton url={productURL}>
            <FaFacebookF />
          </FacebookShareButton>

          <WhatsappShareButton url={productURL}>
            <FaWhatsapp />
          </WhatsappShareButton>
          <button onClick={copyToClipboard}>
            <IoIosLink />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoloRight;
