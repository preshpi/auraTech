import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductProp } from "../../../types/main/product";
import { urlFor } from "../../../sanity/sanity";
import NoImage from "../../general/NoImage";
import { FiShoppingBag } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from "sonner";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { handleAddToCart } from "../../../redux/slices/cartSlice";
import Cookies from "js-cookie";
import { config } from "../../../helper/config";
import { getAuth } from "firebase/auth";

interface IProductProps {
  productData: ProductProp;
}

// STYLES
const buttonStyles =
  "w-[40px] h-[40px] rounded-full bg-[#eee] bg-opacity-80 text-lg flex items-center justify-center cursor-pointer";

const Product = ({ productData }: IProductProps) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();
  const usePathname = () => {
    return location.pathname;
  };

  const getCurrentUrl = usePathname();

  const addToCartFunc = () => {
    const product = {
      _id: productData._id,
      price: productData.price,
      quantity: 1,
      imgUrl: productData.imgUrl,
      name: productData.product_name,
      color: productData.colors[0].title,
      total_price: 0,
    };
    dispatch(handleAddToCart(product));
    toast.success("item added to cart");
  };

  const handleBuyNow = () => {
    // check if user is logged in
    if (user) {
      addToCartFunc();
      router("/cart");
    } else {
      if (getCurrentUrl) {
        Cookies.set(config.key.lastPath, getCurrentUrl);
        router("/login");
      }
    }
  };

  return (
    <div className="lg:w-[266px] w-full h-[full] relative lg:rounded-md overflow-hidden">
      {/* Image  */}
      <Link to={`/shop/${productData._id}`}>
        <div className="w-full h-[300px] overflow-hidden relative z-10 p-2 bg-[#E6E9E8] rounded-md">
          {productData.imgUrl ? (
            <img
              src={urlFor(productData.imgUrl)}
              alt={productData.product_name}
              className="object-cover h-[300px] w-full rounded-md"
            />
          ) : (
            <NoImage />
          )}
        </div>
      </Link>

      <div className="absolute top-3 right-3 flex flex-col gap-y-4 z-20">
        <button className={buttonStyles} onClick={addToCartFunc}>
          <CiShoppingCart />
        </button>
        <button className={buttonStyles} onClick={handleBuyNow}>
          <FiShoppingBag />
        </button>
      </div>
    </div>
  );
};

export default Product;
