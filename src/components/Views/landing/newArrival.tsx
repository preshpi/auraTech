import React from "react";
import { ProductProp } from "../../../types/main/product";
import ProductsParent from "./producstParent";

interface NewArrivalProps {
  text: string;
  productsArr: ProductProp[];
  isLoading: boolean;
}

const NewArrival = React.memo(({ productsArr, text }: NewArrivalProps) => {
  return (
    <div className="py-12">
      <ProductsParent products={productsArr} text={text} />
    </div>
  );
});

export default NewArrival;
