import React from "react";
import { ProductProp } from "../../../types/main/product";
import ProductsParent from "./producstParent";

interface BestSellerProps {
  text: string;
  productsArr: ProductProp[];
  isLoading: boolean;
}

const BestSellers = React.memo(({ productsArr, text }: BestSellerProps) => {
  return (
    <div className="py-12">
      <ProductsParent products={productsArr} text={text} />
    </div>
  );
});

export default BestSellers;
