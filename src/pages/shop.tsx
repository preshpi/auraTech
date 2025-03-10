import ShopContent from "../components/Views/shop/ShopContent";
import { ShopContentSkeleton } from "../components/Views/soloProduct/SkeletonLoader";
import {
  getAllProducts,
  getCategories,
  getProductColors,
} from "../sanity/sanity.query";
import { useQuery } from "react-query";

const Shop = () => {
  const { data, isLoading } = useQuery("products", getAllProducts);
  const { data: colors, isLoading: isColorLoading } = useQuery(
    "colors",
    getProductColors
  );
  const { data: categories, isLoading: isCategoryLoading } = useQuery(
    "categories",
    getCategories
  );

  if (isLoading) {
    return <ShopContentSkeleton />;
  }

  return (
    <ShopContent
      productsArr={data}
      isLoading={isLoading}
      isColorLoading={isColorLoading}
      isCategoryLoading={isCategoryLoading}
      colorArr={colors}
      categoryArr={categories}
    />
  );
};

export default Shop;
