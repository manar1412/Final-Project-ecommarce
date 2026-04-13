import { Link } from "react-router-dom";
import { useCart } from "../../../Hooks/useCart";
import type { CartResponse } from "../../../Types/cart.types";
import { Loader2 } from "lucide-react";

interface CartSummaryProps {
  cart: CartResponse;
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const { clearCart, clearAllCart } = useCart();

  return (
    <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-6">
      <h2 className="text-xl font-bold">Cart Summary</h2>

      <div className="flex justify-between text-gray-700">
        <span>Total Items:</span>
        <span>{cart.numOfCartItems}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Total Price:</span>
        <span className="font-semibold text-green-600">
          {cart.data.totalCartPrice} LE
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => clearCart()}
          disabled={clearAllCart}
          className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex justify-center items-center"
        >
          {clearAllCart ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Clear Cart"
          )}
        </button>

        <Link
          to="/check-out"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
