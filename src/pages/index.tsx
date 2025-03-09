import Navbar from "../components/layout/navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/layout/footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
