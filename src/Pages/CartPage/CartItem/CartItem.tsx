import { Loader2, Trash2 } from "lucide-react";
import type { CartProduct } from "../../../Types/cart.types";
import { useCart } from "../../../Hooks/useCart";
import { truncateWords } from "../../../Helper/TruncateWords";

interface CartItemProps {
  item: CartProduct;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateCart, updatingIds, removeFromCart, removingId } = useCart();

  const isUpdating = updatingIds[item.product._id] || false;
  const isRemoving = removingId === item.product._id;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
      {/* Left: Image + Name */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-gray-800">
            {truncateWords(item.product.title, 2)}
          </h3>
          <p className="text-gray-500">{item.price} L.E</p>
        </div>
      </div>

      {/* Middle: Quantity Controls */}
      <div className="flex items-center gap-2 my-2 md:my-0">
        <button
          onClick={() =>
            updateCart({ productId: item.product._id, count: item.count - 1 })
          }
          disabled={isUpdating || item.count === 1}
          className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          {isUpdating ? <Loader2 className="w-3 animate-spin" /> : "-"}
        </button>
        <span className="px-3 font-medium">{item.count}</span>
        <button
          onClick={() =>
            updateCart({ productId: item.product._id, count: item.count + 1 })
          }
          disabled={isUpdating}
          className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          {isUpdating ? <Loader2 className="w-3 animate-spin" /> : "+"}
        </button>
      </div>

      {/* Right: Remove */}
      <button
        onClick={() => removeFromCart(item.product._id)}
        disabled={isRemoving}
        className="cursor-pointer text-red-500 hover:text-red-700 transition mt-2 md:mt-0"
      >
        {isRemoving ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <Trash2 size={20} />
        )}
      </button>
    </div>
  );
}
