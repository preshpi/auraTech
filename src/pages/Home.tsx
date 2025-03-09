import { useQuery } from "react-query";
import { getBestSellers, getCategories } from "../sanity/sanity.query";
import { CategoryProp, SectionProductsProp } from "../types/main/product";
import Hero from "../components/Views/landing/hero";
import BestSellers from "../components/Views/landing/bestSellers";
import Categories from "../components/Views/landing/categories";

const Home = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    CategoryProp[]
  >("categories", getCategories);

  const { data: bestSellers, isLoading: bestSellersLoading } =
    useQuery<SectionProductsProp>("bestSellers", getBestSellers);

  return (
    <div className="min-h-screen flex flex-col px-12 bg-[#fff]">
      <Hero />
      <Categories categoryData={categories} isLoading={categoriesLoading} />
      {bestSellers && (
        <BestSellers
          text={bestSellers.title}
          productsArr={bestSellers.products}
          isLoading={bestSellersLoading}
        />
      )}
    </div>
  );
};

export default Home;
