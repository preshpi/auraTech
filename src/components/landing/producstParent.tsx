import * as React from "react";
import { ProductProp } from "../../types/main/product";
import Product from "./product";

interface IProductsParentProps {
  products: ProductProp[];
  text: string;
  padding?: boolean;
}

const ProductsParent: React.FunctionComponent<IProductsParentProps> = ({
  products,
  text,
}) => {
  console.log("products", products);

  return (
    <div className="w-full">
      <h3 className="text-left font-medium mb-3 text-black text-[39px]">
        {text}
      </h3>

      <div className="flex gap-x-5 items-center w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:grid-cols-4 justify-center items-center">
          {products?.map((item, index) => (
            <Product key={index} productData={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsParent;
