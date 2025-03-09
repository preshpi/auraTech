import { useEffect, useState } from "react";
import Categories from "../components/landing/categories";
import Hero from "../components/landing/hero";
import Navbar from "../components/layout/navbar";
import { getBestSellers, getCategories } from "../sanity/sanity.query";
import BestSellers from "../components/landing/bestSellers";
import { CategoryProp, SectionProductsProp } from "../types/main/product";

const Home = () => {
  const [categoryData, setCategoryData] = useState<CategoryProp[]>([]);
  const [bestSellerData, setBestSellerData] = useState<SectionProductsProp>();
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setCategoryData(categories);

      const bestSellers = await getBestSellers();
      setBestSellerData(bestSellers);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-12 bg-[#fff]">
      <Navbar />
      <Hero />
      <Categories categoryData={categoryData} />
      {bestSellerData && (
        <BestSellers
          text={bestSellerData.title}
          productsArr={bestSellerData.products}
        />
      )}
    </div>
  );
};

export default Home;
