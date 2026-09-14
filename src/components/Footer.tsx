
import { Link } from "react-router-dom";
import { House, Mail, Phone, MapPin, } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-orange-900/40 bg-gray-950 text-gray-400">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <House className="h-7 w-7 text-orange-400 drop-shadow-lg" />
              <span className="text-2xl font-extrabold uppercase tracking-widest text-white">
                DEVICE <span className="text-orange-400">STORE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your one-stop destination for high-performance gadgets, smartphones, and top-tier laptops. Built for tech enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/" className="transition duration-200 hover:text-orange-400">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition duration-200 hover:text-orange-400">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="transition duration-200 hover:text-orange-400">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400 shrink-0" />
                <span>+880 1300-725948</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400 shrink-0" />
                <span>fuadalmaimun10@gmail.com</span>
              </li>
            </ul>
          </div>
          

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-900 pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} DEVICE STORE. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;