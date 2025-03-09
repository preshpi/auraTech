import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import NotFound from "./pages/notFound";
import Checkout from "./pages/checkout";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Shop from "./pages/shop";
import ProductDetails from "./components/Views/soloProduct/productDetails";
import Layout from "./pages";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
