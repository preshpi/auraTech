import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import Layout from "./pages";

// Lazy load components
const Login = lazy(() => import("./pages/auth/login"));
const Signup = lazy(() => import("./pages/auth/signup"));
const NotFound = lazy(() => import("./pages/notFound"));
const Checkout = lazy(() => import("./pages/checkout"));
const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const Shop = lazy(() => import("./pages/shop"));
const ProductDetails = lazy(
  () => import("./components/Views/soloProduct/productDetails")
);
const ProtectedRoute = lazy(() => import("./pages/auth/ProctectedRoute"));

// Empty fallback - nothing will show during loading
const EmptyFallback = () => null;

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
      <Suspense fallback={<EmptyFallback />}>
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
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
