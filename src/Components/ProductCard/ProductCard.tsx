import { Eye, Heart, Loader2, ShoppingCart, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { ProductCardProps } from "../../Types/products.types";
import { useCart } from "../../Hooks/useCart";
import { useWishList } from "../../Hooks/useWishList";
import { useAuth } from "../../Context/AuthContext";

export default function ProductCard({
  id,
  image,
  category,
  name,
  price,
  priceAfterDiscount,
  ratingsAverage,
}: ProductCardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, isAdding, isRemoving } = useCart();
  const {
    wishlist,
    removeFromWishList,
    addToWishList,
    isAddingToWishList,
    isRemovingFromWishlist,
  } = useWishList();

  const isInCart = cart?.data?.products?.some(
    (item) => item.product._id === id
  );
  const isCartLoading = isAdding || isRemoving;

  const isInWishlist = wishlist?.data?.some((item) => item._id === id);
  const isWishLoading = isAddingToWishList || isRemovingFromWishlist;

  const hasDiscount = priceAfterDiscount && priceAfterDiscount < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const formatPrice = (price: number) => Math.round(price);

  function handleAddToCart() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    isInCart ? removeFromCart(id) : addToCart(id);
  }

  function handleToggleWishlist() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    isInWishlist ? removeFromWishList(id) : addToWishList(id);
  }

  return (
    <div className="p-2 relative rounded-md overflow-hidden group cursor-pointer bg-white border border-gray-300 hover:border-blue-500 transition-colors duration-300 hover:shadow-lg">
      {/* IMAGE */}
      <div className="relative rounded-md overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* DISCOUNT BADGE */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold z-10">
            -{discountPercentage}%
          </div>
        )}

        {/* DESKTOP OVERLAY  */}
        <div className="layer absolute inset-0 bg-blue-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
              <Link to={`/products-details/${id}`}>
                <button className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <Eye className="w-5 h-5 text-gray-700 hover:text-blue-600" />
                </button>
              </Link>

              <button
                onClick={handleToggleWishlist}
                disabled={isWishLoading}
                className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl delay-75 cursor-pointer"
                aria-label="Toggle wishlist"
              >
                {isWishLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-red-600" />
                ) : (
                  <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isInWishlist
                        ? "text-red-600 fill-red-600"
                        : "text-gray-700 hover:text-red-500"
                    }`}
                  />
                )}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl delay-150 cursor-pointer"
                aria-label="Toggle cart"
              >
                {isCartLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                ) : (
                  <ShoppingCart
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isInCart
                        ? "text-green-600 fill-green-600"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE ACTIONS BAR */}
        <div className="sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-lg">
            <Link to={`/products-details/${id}`}>
              <button className="mobile-btn">
                <Eye className="mobile-icon text-gray-700" />
              </button>
            </Link>

            <button
              onClick={handleToggleWishlist}
              disabled={isWishLoading}
              className="mobile-btn"
            >
              {isWishLoading ? (
                <Loader2 className="mobile-icon animate-spin text-red-600" />
              ) : (
                <Heart
                  className={`mobile-icon ${
                    isInWishlist ? "text-red-600 fill-red-600" : "text-gray-700"
                  }`}
                />
              )}
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              className="mobile-btn"
            >
              {isCartLoading ? (
                <Loader2 className="mobile-icon animate-spin text-green-600" />
              ) : (
                <ShoppingCart
                  className={`mobile-icon ${
                    isInCart ? "text-green-600 fill-green-600" : "text-gray-700"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-4">
        <h3 className="text-sm text-gray-500 uppercase tracking-wide">
          {category}
        </h3>
        <h2 className="text-lg font-semibold text-gray-800 mt-1 line-clamp-1">
          {name}
        </h2>
      </div>

      {/* PRICE + RATING */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-bold text-gray-900">
                {formatPrice(priceAfterDiscount)} L.E
              </span>
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(price)} L.E
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(price)} L.E
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium text-gray-700">
            {(ratingsAverage ?? 0).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
