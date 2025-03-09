import ShopContent from "../components/Views/shop/ShopContent";
import {
  getAllProducts,
  getCategories,
  getProductColors,
} from "../sanity/sanity.query";
import { useQuery } from "react-query";

const Shop = () => {
  const { data } = useQuery("products", getAllProducts);
  const { data: colors } = useQuery("colors", getProductColors);
  const { data: categories } = useQuery("categories", getCategories);

  return (
    <ShopContent
      productsArr={data}
      colorArr={colors}
      categoryArr={categories}
    />
  );
};

export default Shop;
