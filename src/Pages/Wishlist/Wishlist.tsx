import { Heart, Loader2, ShoppingCart, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useCart } from "../../Hooks/useCart";
import { useWishList } from "../../Hooks/useWishList";
import useAOS from "../../Hooks/useAOS";

export default function Wishlist() {
  useAOS();
  const { wishlist, isLoading, removeFromWishList, removingId } = useWishList();
  const { addToCart, addingId } = useCart();

  if (isLoading) return <Loading />;

  if (!wishlist || wishlist.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <Heart size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Start adding products you love ❤️</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.data.map((item) => {
          const isAddingThisItem = addingId === item._id;
          const isRemovingThisItem = removingId === item._id;

          return (
            <div
              key={item._id}
              data-aos="fade-up"
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 flex flex-col gap-3">
                <h3 className="font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    {item.price} LE
                  </span>

                  <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{item.ratingsAverage}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => addToCart(item._id)}
                    disabled={isAddingThisItem}
                    className="flex-1 flex items-center justify-center gap-2
                  bg-blue-600 text-white py-2 rounded-lg
                  hover:bg-blue-700 transition cursor-pointer
               disabled:opacity-60"
                  >
                    {isAddingThisItem ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => removeFromWishList(item._id)}
                    disabled={isRemovingThisItem}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
                  >
                    {isRemovingThisItem ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
