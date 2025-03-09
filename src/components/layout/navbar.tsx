import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiUser, CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-semibold text-primary-500">
            AuraTech.
          </Link>

          <div className="flex items-center space-x-4">
            <div className="w-[300px] flex items-center px-5 py-2 bg-accent-50 text-[16px] rounded-md">
              <input
                type="text"
                className="focus:outline-hidden w-full placeholder:text-accent-500"
                placeholder="Search for products"
                value={searchInput}
                onChange={handleInputChange}
              />
              <Search className="text-accent-700" size={16} />
            </div>

            <div className="relative">
              <button
                className="p-2 text-gray-700 hover:text-primary-500"
                aria-label="Cart"
              >
                <CiShoppingCart size={25} />

                <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </button>
            </div>

            <Link
              to="/login"
              className=" text-gray-700 hover:text-primary-500"
              aria-label="Login"
            >
              <CiUser size={25} />
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
