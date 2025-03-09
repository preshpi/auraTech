import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import NotFound from "./pages/notFound";
import Checkout from "./pages/checkout";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Shop from "./pages/shop";
import ProductDetails from "./components/Views/soloProduct/productDetails";
import Layout from "./pages";
import ProtectedRoute from "./pages/auth/ProctectedRoute";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

function LoggedIn() {
  const location = useLocation();
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />{" "}
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
