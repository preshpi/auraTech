import { LogOut, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useAppSelector } from "../../hooks/redux.hook";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isLoggedIn, userDetails: user } = useAppSelector(
    (state) => state.user
  );
  const { logout } = useAuth();

  console.log("User:", user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
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

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-gray-700 hover:text-indigo-600 flex items-center"
                  aria-label="User menu"
                >
                  {user?.image ? (
                    <img
                      src={user.image || "/placeholder.svg"}
                      alt={user.firstname || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User size={20} />
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user?.firstname || user?.email} {user?.lastname}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-700 hover:text-indigo-600"
                aria-label="Login"
              >
                <User size={20} />
              </Link>
            )}

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
