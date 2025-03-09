import { useEffect } from "react";
import { useAppSelector } from "../hooks/redux.hook";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../hooks/useUserRedirect";
import CheckoutContainer from "../components/Views/checkout/CheckoutContainer";
import CheckoutBackBtn from "../components/Views/checkout/CheckoutBackBtn";
import Order from "../components/Views/checkout/Order";

const Checkout = () => {
  const { isAuthenticated } = useAuthRedirect();

  const cartProducts = useAppSelector((state) => state.cart.products);
  const router = useNavigate();
  useEffect(() => {
    const productUnavailable = cartProducts.some(
      (item) => item.status === "outOfStock"
    );

    if (productUnavailable) {
      // Redirect back to the cart if any product is unavailable
      alert(
        "Some products are unavailable or expired. Redirecting to the cart."
      );
      router("/cart");
    }
  }, [cartProducts, router]);
  return isAuthenticated ? (
    <CheckoutContainer>
      <div className="lg:px-20 mx-auto max-w-[1240px] px-5 flex flex-col w-full h-full">
        <CheckoutBackBtn />

        <h3 className="border-b pt-10 py-3 border-gray-300 text-[18px] font-bold w-full">
          Checkout
        </h3>

        <Order />
      </div>
    </CheckoutContainer>
  ) : null;
};

export default Checkout;
