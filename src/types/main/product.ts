export type ProductProp = {
  _id: string;
  colors: ColorSizeProp[];
  imgUrl: ImageProp;
  otherImages: ImageProp[];
  product_name: string;
  product_desc: string;
  price: number;
  categories: CategoryProp[];
  status: string;
  _createdAt: string;
};

export type ColorSizeProp = {
  _id: string;
  title: string;
};

export type CategoryProp = {
  _id: string;
  image: ImageProp;
  name: string;
  description?: string;
  slug: { current: string; _type: string };
};

export type ImageProp = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type SectionProductsProp = {
  products: ProductProp[];
  title: string;
  _id: string;
};

export type PriceRange = {
  min: number;
  max: number;
};

export type filterDataProp = {
  color?: string;
  targetPrice?: number;
  priceComparison?: string;
  priceRange?: PriceRange;
};

export type CatFilterPrice = {
  color: string;
  price: number | null;
};
