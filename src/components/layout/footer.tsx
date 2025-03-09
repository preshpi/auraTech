import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AuraTech</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for all tech accessories. Quality products at
              affordable prices.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-400 hover:text-white"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop?cat=phone-cases"
                  className="text-gray-400 hover:text-white"
                >
                  Phone Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?cat=laptop-stands"
                  className="text-gray-400 hover:text-white"
                >
                  Laptop Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?cat=noise-canceling-headphones"
                  className="text-gray-400 hover:text-white"
                >
                  Audio Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?cat=wireless-chargers"
                  className="text-gray-400 hover:text-white"
                >
                  Charging & Power
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?cat=gaming-chairs"
                  className="text-gray-400 hover:text-white"
                >
                  Gaming Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-2 text-indigo-400 flex-shrink-0 mt-1"
                />
                <span className="text-gray-400">
                  123 Tech Street, Digital City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-2 text-indigo-400 flex-shrink-0"
                />
                <span className="text-gray-400">+234 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={20}
                  className="mr-2 text-indigo-400 flex-shrink-0"
                />
                <span className="text-gray-400">support@auratech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AuraTech. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-white text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/shipping-policy"
                className="text-gray-400 hover:text-white text-sm"
              >
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
