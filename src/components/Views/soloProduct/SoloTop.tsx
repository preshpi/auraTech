import { BsCart2 } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

type Props = {
  category: string;
  product_name: string;
};

const SoloTop = ({ category, product_name }: Props) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex gap-x-2 items-center">
        <Link to={"/"} className="capitalize font-medium text-gray-400 text-sm">
          Home
        </Link>
        <p className="opacity-50 text-sm">
          <IoIosArrowForward />
        </p>
      </div>
      <div className="flex gap-x-2 items-center">
        <p className="text-base opacity-90">
          <BsCart2 />
        </p>
        <Link
          to={"/shop"}
          className="capitalize font-medium text-gray-400 text-sm"
        >
          shop
        </Link>
      </div>

      <div className="flex gap-x-2 text-justify items-center">
        <p className="opacity-50 text-sm">
          <IoIosArrowForward />
        </p>
        {category && (
          <>
            <Link
              to={`/shop?cat=${category}`}
              className="capitalize font-medium text-gray-400 text-sm"
            >
              {category}
            </Link>
            <p className="opacity-50 text-sm">
              <IoIosArrowForward />
            </p>
          </>
        )}
      </div>

      <div className="flex gap-x-3 items-center">
        <p className="capitalize font-semibold text-gray-500 text-sm">
          {product_name}
        </p>
      </div>
    </div>
  );
};

export default SoloTop;
