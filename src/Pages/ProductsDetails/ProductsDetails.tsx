import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../Hooks/useProduct";
import Loading from "../../Components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Heart, Loader2, Star } from "lucide-react";
import { useCart } from "../../Hooks/useCart";
import { useWishList } from "../../Hooks/useWishList";
import { useAuth } from "../../Context/AuthContext";

export default function ProductsDetails() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart, isAdding } = useCart();
  const { data, isLoading } = useProduct(id ?? "");
  const {
    isAddingToWishList,
    isRemovingFromWishlist,
    wishlist,
    addToWishList,
    removeFromWishList,
  } = useWishList();

  function handleAddtoCart() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!id) return;
    addToCart(id);
  }

  function handAddToWishlist() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!id) return;
    isInWishlist ? removeFromWishList(id) : addToWishList(id);
  }

  if (isLoading) return <Loading />;

  const isInWishlist = wishlist?.data?.some((item) => item._id === id);
  const isWishLoading = isAddingToWishList || isRemovingFromWishlist;

  const imageItems =
    data?.data?.images?.map((imageUrl: string) => ({
      original: imageUrl,
      thumbnail: imageUrl,
    })) ?? [];

  return (
    <section className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Slider */}
        <div className="md:col-span-5">
          <ReactImageGallery
            items={imageItems}
            showNav
            showFullscreenButton
            showPlayButton={false}
            thumbnailPosition="bottom"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900">
            {data?.data.title}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              {data?.data.ratingsAverage}
            </div>
            <span className="text-sm text-gray-500">(Customer Reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-green-600">
              {data?.data.price} LE
            </span>
            <span className="text-sm text-gray-500">Inclusive of VAT</span>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {data?.data.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleAddtoCart}
              className="flex-1 flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              {isAdding ? (
                <Loader2 className="w-6 h-6 animate-spin " />
              ) : (
                "Add to Cart"
              )}
            </button>

            <button
              onClick={handAddToWishlist}
              disabled={isWishLoading}
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
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
          </div>
        </div>
      </div>
    </section>
  );
}
