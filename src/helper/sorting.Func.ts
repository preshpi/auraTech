import { ProductProp, filterDataProp } from "../types/main/product";

export const sortingFunc = (value: string, products: ProductProp[]) => {
  if (value === "old") {
    const filterByDateOldToNew = products.sort(
      (a, b) =>
        new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
    );
    return filterByDateOldToNew;
  }

  if (value === "pasc") {
    const filterByPriceAsc = products.sort((a, b) => a.price - b.price);
    return filterByPriceAsc;
  }

  if (value === "pdesc") {
    const filterByPriceDesc = products.sort((a, b) => b.price - a.price);
    return filterByPriceDesc;
  }

  if (value === "recent") {
    const filterByDateMostRecent = products.sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
    return filterByDateMostRecent;
  }
};

export const filterProducts = (
  products: ProductProp[],
  filterData: filterDataProp
): ProductProp[] => {
  return products.filter((product) => {
    let isColorMatch = true;
    let isPriceMatch = true;

    if (filterData.color) {
      isColorMatch = product.colors.find(
        (item) => item.title === filterData.color
      )
        ? true
        : false;
    }

    if (filterData.priceRange) {
      isPriceMatch =
        product.price >= filterData.priceRange.min &&
        product.price <= filterData.priceRange.max;
    } else if (filterData.targetPrice) {
      isPriceMatch =
        filterData.priceComparison === "below"
          ? product.price < filterData.targetPrice
          : product.price > filterData.targetPrice;
    }

    return isColorMatch && isPriceMatch;
  });
};

export const filterProductsByCategory = (
  productsArr: ProductProp[],
  activeCat: string
) => {
  if (activeCat === "") {
    return productsArr;
  }

  const filtered = productsArr.filter((item) =>
    item.categories?.find((item) => item.slug.current === activeCat)
  );

  return filtered;
};
