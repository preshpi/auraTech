import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CartProductProp,
  CartUniqueProp,
  InitialCartState,
} from "../../types/main/cart";
// Define the initial state using that type
const initialState: InitialCartState = {
  products: [],
  cartItems: 0,
  products_total_price: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddToCart: (state, action: PayloadAction<CartProductProp>) => {
      // get the product id color and size
      const { _id, color, status } = action.payload;

      //   check if product already exist
      const existItem = state.products.find(
        (item) =>
          item._id === _id && item.color === color && item.status === status
      );

      if (existItem) {
        existItem.quantity = existItem.quantity + action.payload.quantity;
        existItem.total_price = existItem.quantity * existItem.price;
        state.products_total_price = state.products.reduce(
          (acc, item) => acc + item.total_price,
          0
        );
        return;
      }

      //   if new product add it to cart
      state.products.push({
        _id: action.payload._id,
        name: action.payload.name,
        color: action.payload.color,
        imgUrl: action.payload.imgUrl,
        price: action.payload.price,
        total_price: action.payload.price,
        quantity: action.payload.quantity,
        status: action.payload.status,
      });
      state.cartItems += 1;
      state.products_total_price = state.products.reduce(
        (acc, item) => acc + item.total_price,
        0
      );
    },

    handleIncreaseProductQuantity: (
      state,
      action: PayloadAction<CartUniqueProp>
    ) => {
      const { _id, color } = action.payload;

      //   check if product already exist
      const existItem = state.products.find(
        (item) => item._id === _id && item.color === color
      );

      if (existItem) {
        existItem.quantity += 1;
        existItem.total_price += existItem.price;
        state.products_total_price = state.products.reduce(
          (acc, item) => acc + item.total_price,
          0
        );
        return;
      }
    },

    handleReduceProductQuantity: (
      state,
      action: PayloadAction<CartUniqueProp>
    ) => {
      const { _id, color } = action.payload;

      //   check if product already exist
      const existItem = state.products.find(
        (item) => item._id === _id && item.color === color
      );

      if (existItem && existItem.quantity !== 1) {
        existItem.quantity -= 1;
        existItem.total_price -= existItem.price;
        state.products_total_price = state.products.reduce(
          (acc, item) => acc + item.total_price,
          0
        );
        return;
      }

      //   if the product quantity is one remove product from cart
      if (existItem && existItem.quantity === 1) {
        state.products = state.products.filter(
          (item) =>
            !(item._id === existItem._id && item.color === existItem.color)
        );
        state.cartItems -= 1;
        state.products_total_price = state.products.reduce(
          (acc, item) => acc + item.total_price,
          0
        );
      }
    },

    handleRemoveItemFromCart: (
      state,
      action: PayloadAction<CartUniqueProp>
    ) => {
      // get the product id color and size
      const { _id, color } = action.payload;

      //   check if product already exist
      const existItem = state.products.find(
        (item) => item._id === _id && item.color === color
      );

      if (existItem) {
        state.products = state.products.filter(
          (item) =>
            !(item._id === existItem._id && item.color === existItem.color)
        );
        state.cartItems -= 1;
        state.products_total_price = state.products.reduce(
          (acc, item) => acc + item.total_price,
          0
        );
      }
    },

    handleClearCart: (state) => {
      state.products = [];
      state.cartItems = 0;
    },
  },
});

export const {
  handleAddToCart,
  handleReduceProductQuantity,
  handleIncreaseProductQuantity,
  handleRemoveItemFromCart,
  handleClearCart,
} = CartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const cartItems = (state: RootState) => state.cart.cartItems;
export const cartProducts = (state: RootState) => state.cart.products;

export default CartSlice.reducer;
