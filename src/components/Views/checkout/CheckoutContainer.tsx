"use client";
import { useAppSelector } from "../../../hooks/redux.hook";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const CheckoutContainer = ({ children }: Props) => {
  // HOOKS
  const router = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  // USE EFFECTS
  // if cart item is empty redirect to shop page
  React.useEffect(() => {
    if (cartItems === 0) {
      router("/shop");
    }
  }, [cartItems]);

  return cartItems === 0 ? null : <>{children}</>;
};

export default CheckoutContainer;
