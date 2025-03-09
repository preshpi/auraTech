import { ImageProp } from "./product";

export type InitialCartState = {
  products: CartProductProp[];
  cartItems: number;
  products_total_price: number;
};

export type CartProductProp = {
  _id: string;
  price: number;
  quantity: number;
  imgUrl: ImageProp;
  name: string;
  color: string;
  total_price: number;
  _key?: string;
  status?: string;
};

export type CartUniqueProp = {
  _id: string;
  color: string;
  offerEndDate?: string;
};
