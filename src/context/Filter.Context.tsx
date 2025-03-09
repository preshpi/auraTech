"use client";
import { isEmptyObject } from "../helper/emptyObj.fun";
import {
  filterProducts,
  filterProductsByCategory,
  sortingFunc,
} from "../helper/sorting.Func";
import {
  CatFilterPrice,
  PriceRange,
  ProductProp,
  filterDataProp,
} from "../types/main/product";
import * as React from "react";

const FilterContext = React.createContext<
  | {
      isOpenDialog: boolean;
      profilePage: number;
      setProfilePage: React.Dispatch<React.SetStateAction<number>>;
      setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
      activeFilter: CatFilterPrice;
      priceType: string;
      activeCat: string;
      sortBy: string;
      products: ProductProp[];
      originalProductsData: ProductProp[];
      priceRange: PriceRange;
      priceErr: boolean | null;
      setPriceRange: (priceRange: PriceRange) => void;
      clearActiveFilter: () => void;
      handleApplyFilter: () => void;
      handleActiveCat: (prop: string) => void;
      handlePriceType: (prop: string) => void;
      handleOriginalProducts: (prop: ProductProp[]) => void;
      handleRemoveActiveFilter: (prop: string) => void;
      handleActiveFilter: (props: string | number, type: string) => void;
      handleProducts: (products: ProductProp[]) => void;
      handleSortBy: (sortBy: string) => void;
    }
  | undefined
>(undefined);

export const useFilter = () => {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterContextProvider");
  }
  return context;
};

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // USE STATES
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const [profilePage, setProfilePage] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState<CatFilterPrice>({
    color: "",
    price: null,
  });
  const [priceRange, setPriceRange] = React.useState<PriceRange>({
    min: 0,
    max: 0,
  });
  const [activeCat, setActiveCat] = React.useState<string>("");
  const [priceType, setPriceType] = React.useState<string>("");
  const [originalProductsData, setOriginalProductsData] = React.useState<
    ProductProp[]
  >([]);
  const [products, setProducts] = React.useState<ProductProp[]>([]);
  const [sortBy, setSortBy] = React.useState<string>("recent");
  const [filters, setFilters] = React.useState<filterDataProp>({});
  const [priceErr, setPriceErr] = React.useState<boolean | null>(null);

  //   FUNCTIONS
  const handleActiveFilter = (props: string | number, type: string) => {
    switch (type) {
      case "color":
        setActiveFilter((prev) => ({ ...prev, color: props.toString() }));
        break;
      case "size":
        setActiveFilter((prev) => ({ ...prev, size: props.toString() }));
        break;
      case "price":
        setActiveFilter((prev) => ({ ...prev, price: Number(props) }));
        break;
      default:
        break;
    }
  };

  const handleOriginalProducts = (products: ProductProp[]) => {
    setOriginalProductsData(products);
  };

  const handleRemoveActiveFilter = (prop: string) => {
    switch (prop) {
      case "color": {
        const { color, ...otherData } = filters; // eslint-disable-line @typescript-eslint/no-unused-vars
        setActiveFilter((prev) => ({ ...prev, color: "" }));
        setFilters(otherData);
        break;
      }
      case "price": {
        const { ...otherData3 } = filters;
        setActiveFilter((prev) => ({ ...prev, price: null }));
        setFilters(otherData3);
        break;
      }
      default:
        break;
    }
  };

  const handlePriceType = (prop: string) => {
    setPriceType(prop);
  };

  const handleActiveCat = (prop: string) => {
    setActiveCat(prop);
  };

  const clearActiveFilter = () => {
    setActiveFilter({ price: null, color: "" });
    setFilters({});
  };

  const handleProducts = (products: ProductProp[]) => {
    setProducts(products);
  };

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const handleApplyFilter = () => {
    const activeColor = activeFilter.color;
    const activePrice = activeFilter.price;
    const minPrice = priceRange.min;
    const maxPrice = priceRange.max;

    if (!activeColor && !activePrice && maxPrice === 0 && minPrice === 0) {
      return;
    }

    if (minPrice > maxPrice) {
      setPriceErr(true);
      return;
    }

    if (activeColor) {
      setFilters((prev) => ({ ...prev, color: activeColor }));
    }
    if (activePrice && priceType) {
      setFilters((prev) => ({
        ...prev,
        targetPrice: activePrice,
        priceComparison: priceType,
      }));
    }

    if (maxPrice > 0 && minPrice > 0) {
      setFilters((prev) => ({
        ...prev,
        priceRange: { min: minPrice, max: maxPrice },
      }));
    }
  };

  // USE EFFECTS
  React.useEffect(() => {
    const res = filterProductsByCategory(originalProductsData, activeCat);

    if (isEmptyObject(filters)) {
      if (sortBy) {
        const sorted = sortingFunc(sortBy, res);
        if (sorted) {
          handleProducts(sorted);
        }
      }
      return;
    }

    const newSorting = sortingFunc(sortBy, res);

    if (newSorting) {
      const filteredProducts = filterProducts(newSorting, filters);
      handleProducts(filteredProducts);
    }
  }, [filters, activeFilter, originalProductsData, activeCat]);

  React.useEffect(() => {
    if (priceRange.min <= priceRange.max) {
      setPriceErr(false);
      return;
    }
  }, [priceRange]);

  return (
    <FilterContext.Provider
      value={{
        profilePage,
        setProfilePage,
        activeFilter,
        priceType,
        activeCat,
        originalProductsData,
        products,
        sortBy,
        priceRange,
        priceErr,
        setPriceRange,
        clearActiveFilter,
        handleActiveCat,
        handlePriceType,
        handleRemoveActiveFilter,
        handleApplyFilter,
        handleActiveFilter,
        handleProducts,
        handleSortBy,
        handleOriginalProducts,
        isOpenDialog,
        setIsOpenDialog,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
