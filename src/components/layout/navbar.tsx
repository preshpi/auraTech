import { LogOut, Search, User } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { Link } from "react-router-dom";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useAppSelector } from "../../hooks/redux.hook";
import { useAuth } from "../../hooks/useAuth";
import { getCategories, searchProducts } from "../../sanity/sanity.query";
import { CategoryProp, ProductProp } from "../../types/main/product";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import NoImage from "../general/NoImage";
import { IoCloseOutline } from "react-icons/io5";

import { urlFor } from "../../sanity/sanity";
import { useQuery } from "react-query";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<ProductProp[]>([]);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [isVisible] = useState<boolean>(false);
  const userDetails = useAppSelector((state) => state.user.userDetails);
  const [isLoading, startTransition] = useTransition();

  const { isLoggedIn, userDetails: user } = useAppSelector(
    (state) => state.user
  );
  const { logout } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const { data: categoryArr = [], isLoading: isCategoryLoading } = useQuery<
    CategoryProp[]
  >("categories", getCategories);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchInput.trim() !== "") {
        const results = await searchProducts(searchInput);
        setSearchResults(results);
        setShowSearchResult(true);
      } else {
        setShowSearchResult(false);
      }
    };

    fetchSearchResults();
  }, [searchInput]);

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logout();
        setShowUserMenu(false);
      } catch (error) {
        console.error("Logout failed:", error);
      }
    });
  };

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showSidebar]);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 hidden lg:block">
        <div className="container mx-auto lg:px-12 py-4">
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

              {showSearchResult && (
                <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg top-16 w-[300px] z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product._id}
                        to={`/shop/${product._id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {product.product_name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-700">
                      No results found
                    </div>
                  )}
                </div>
              )}

              <Link to="/cart" className="relative">
                <button
                  className="p-2 text-gray-700 hover:text-primary-500"
                  aria-label="Cart"
                >
                  <CiShoppingCart size={25} />

                  <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                </button>
              </Link>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 text-gray-700 hover:text-indigo-600 flex items-center"
                    aria-label="User menu"
                  >
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.firstname || "User"}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User size={20} />
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-40 border border-accent-200 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-accent-200">
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
            </div>
          </div>
        </div>
      </header>

      {/* mobile navbar */}
      <div className="relative">
        <div className={`lg:hidden ${showSidebar ? "blurred" : ""}`}>
          <div
            className={`w-full gap-3 flex flex-col items-center py-3 px-4 border-b duration-300 ${
              showSidebar || isVisible
                ? "fixed shadow-md bg-opacity-90 top-0 bg-white border-none backdrop-blur-md z-[99]"
                : ""
            }`}
          >
            <div className="justify-between flex items-center w-full">
              <div className="w-full">
                <button onClick={() => setShowSidebar(true)}>
                  <FiMenu className="w-6 h-6 cursor-pointer" />
                </button>
              </div>
              <Link to="/" className="text-3xl font-semibold text-primary-500">
                AuraTech.
              </Link>
              <div className="w-full flex items-center z-50 justify-end gap-3">
                <Link
                  to="/cart"
                  className={`text-2xl text-gray-700 hover:text-primary-500 relative`}
                >
                  <CiShoppingCart className="w-6 h-6" />
                  <span className="w-4 h-4 -top-2 -right-2 text-xs rounded-full flex items-center justify-center absolute bg-primary-400 text-white">
                    {cartItems}
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <div
                className={`w-full border-gray-200 rounded border relative ${
                  isVisible ? "bg-white" : "bg-gray-100"
                } flex items-center`}
              >
                <input
                  type="text"
                  className="bg-transparent w-full px-5 py-2 text-[16px] focus:outline-none"
                  placeholder="Search for products"
                  value={searchInput}
                  onChange={handleInputChange}
                />
                <button className="text-2xl text-gray-400 absolute right-5">
                  <CiSearch />
                </button>
              </div>
              {/* Search Result  */}
              {showSearchResult && (
                <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg top-26 w-full z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product._id}
                        to={`/shop/${product._id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {product.product_name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-700">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* this closes the sidebar when the user clicks on the visible main view */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black opacity-70 backdrop-blur z-50"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-md z-100 transition-transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="overflow-y-auto h-full w-[350px] items-start flex flex-col">
            {/* Sidebar content goes here */}
            <div className="w-full border-b border-gray-300 py-3">
              <div className="px-3 flex items-center w-full justify-between gap-3">
                <button onClick={() => setShowSidebar(false)}>
                  <IoCloseOutline className="w-8 h-8" />
                </button>
                <Link
                  to="/"
                  className="text-3xl font-semibold text-primary-500"
                >
                  AuraTech.
                </Link>
              </div>
            </div>

            {/* account */}
            <div className="p-4  bg-[#333] text-white flex w-full items-center justify-between">
              <div className="flex w-full items-center gap-3">
                <FaUser className="text-white" />
                {user ? (
                  <p> Hi, {userDetails?.firstname} </p>
                ) : (
                  <p>My Account</p>
                )}
              </div>
              <div className="flex items-center w-full gap-2 justify-end">
                {user ? (
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="underline focus:none outline-none hover:opacity-75 transition-all duration-300"
                  >
                    {isLoading ? "Logging out..." : "Logout"}
                  </button>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="underline focus:none outline-none hover:opacity-75 transition-all duration-300">
                        Log In
                      </button>{" "}
                    </Link>
                    |
                    <Link to="/signup">
                      <button className="underline focus:none outline-none hover:opacity-75 transition-all duration-300">
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* categories */}
            <div className="px-2 py-3 border-b border-gray-300 w-full">
              {isCategoryLoading ? (
                <p className="text-sm text-gray-500">
                  Getting category please wait
                </p>
              ) : (
                categoryArr.map(({ _id, name, slug, image }) => (
                  <div key={_id} className="py-1">
                    <Link to={`/shop?cat=${slug?.current}`}>
                      <div className="flex justify-between items-center bg-gray-200 h-full">
                        <div className="w-full flex px-4 h-full">
                          <p className="font-semibold text-[16px]">{name}</p>
                        </div>

                        <div className="relative w-[80px] h-[80px]">
                          {image ? (
                            <img
                              src={urlFor(image)}
                              alt={name}
                              className="object-cover absolute inset-0 w-full h-full"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <NoImage />
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
