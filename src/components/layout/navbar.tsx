import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            AuraTech.
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/category/phone-accessories"
              className="text-gray-700 hover:text-indigo-600"
            >
              Phone
            </Link>
            <Link
              to="/category/laptop-accessories"
              className="text-gray-700 hover:text-indigo-600"
            >
              Laptop
            </Link>
            <Link
              to="/category/audio-accessories"
              className="text-gray-700 hover:text-indigo-600"
            >
              Audio
            </Link>
            <Link
              to="/category/charging-power"
              className="text-gray-700 hover:text-indigo-600"
            >
              Power
            </Link>
            <Link
              to="/category/gaming-accessories"
              className="text-gray-700 hover:text-indigo-600"
            >
              Gaming
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-gray-700 hover:text-indigo-600"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <div className="relative">
              <button
                className="p-2 text-gray-700 hover:text-indigo-600"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />

                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </button>
            </div>

            <Link
              to="/login"
              className="p-2 text-gray-700 hover:text-indigo-600"
              aria-label="Login"
            >
              <User size={20} />
            </Link>

            <button
              className="p-2 text-gray-700 hover:text-indigo-600 md:hidden"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
