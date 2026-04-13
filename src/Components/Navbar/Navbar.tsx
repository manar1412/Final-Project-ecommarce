import { NavLink } from "react-router-dom";
import logo from "@/assets/freshcart-logo.svg";
import {
  Loader2,
  LogOut,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Hooks/useCart";
import { useWishList } from "../../Hooks/useWishList";

export default function Navbar() {
  const { wishlist, isAddingToWishList, isFetchingToWishlist } = useWishList();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const { cart, isAdding, isFetching } = useCart();

  const wishlistCount = wishlist?.data?.length ?? 0;
  const hasWishlistItems = wishlistCount > 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
      <nav className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
        <NavLink to="/">
          <img
            src={logo}
            alt="FreshCart"
            className="w-32 h-10 object-contain"
          />
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isWishlist = link.name === "Wishlist";

            return (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => {
                  const base =
                    "relative font-medium px-2 py-1 text-gray-700 dark:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-blue-600 after:origin-left after:transition-transform after:duration-300";

                  const textColor = isActive
                    ? "text-blue-600"
                    : "hover:text-blue-600";

                  const underline = isActive
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100";

                  const wishlistClasses =
                    isWishlist && hasWishlistItems
                      ? "text-red-600 font-bold"
                      : "";

                  return `${base} ${textColor} ${underline} ${wishlistClasses}`;
                }}
              >
                {link.name}

                {/* 🔴 Wishlist Badge */}
                {isWishlist && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {isAddingToWishList || isFetchingToWishlist ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      wishlistCount
                    )}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-blue-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          <NavLink to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            <span className="absolute -top-3 -right-3 bg-blue-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {isAdding || isFetching ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                cart?.numOfCartItems || 0
              )}
            </span>
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="hidden md:block px-4 py-2 ml-2 bg-blue-500 text-white cursor-pointer rounded-md hover:bg-red-700"
            >
              <LogOut />
            </button>
          ) : (
            <NavLink
              to="/login"
              className="hidden md:block px-4 py-2 ml-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </NavLink>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE ================= */}
      <div
        className={`
    md:hidden
    fixed inset-x-0 top-16 z-40
    bg-white dark:bg-gray-800
    border-t border-gray-200 dark:border-gray-700
    transition-all duration-300 ease-in-out
    ${
      open
        ? "translate-y-0 opacity-100"
        : "-translate-y-4 opacity-0 pointer-events-none"
    }
  `}
      >
        <div className="flex flex-col gap-2 px-4 py-4">
          {navLinks.map((link) => {
            const isWishlist = link.name === "Wishlist";

            return (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
            flex items-center justify-between
            px-4 py-3 rounded-lg
            text-base font-medium
            transition
            ${
              isActive
                ? "bg-blue-50 text-blue-600 dark:bg-gray-700"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }
          `
                }
              >
                <span>{link.name}</span>

                {/* Wishlist badge */}
                {isWishlist && (
                  <span className="bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                    {isAddingToWishList || isFetchingToWishlist ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      wishlistCount
                    )}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* AUTH (Mobile Only) */}
          <div className="pt-3 mt-3 border-t dark:border-gray-700">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="
            w-full py-3
            flex items-center justify-center gap-2
            text-red-600 font-semibold
            rounded-lg
            hover:bg-red-50 dark:hover:bg-red-900/20
          "
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="
            block text-center py-3
            rounded-lg
            bg-blue-600 text-white font-semibold
            hover:bg-blue-700
          "
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
