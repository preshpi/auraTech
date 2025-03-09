import Navbar from "../components/layout/navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/layout/footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
