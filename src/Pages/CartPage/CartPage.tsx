import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useCart } from "../../Hooks/useCart";
import CartSummary from "./CartSummary/CartSummary";
import CartItem from "./CartItem/CartItem";
import useAOS from "../../Hooks/useAOS";

export default function CartPage() {
  useAOS();
  const { cart, isLoading } = useCart();

  if (isLoading) {
    return <Loading />;
  }

  if (!cart || cart.numOfCartItems === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-center">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">
          Looks like you haven’t added any products yet.
        </p>
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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {cart.data.products.map((item) => (
          <CartItem data-aos="fade-up" key={item._id} item={item} />
        ))}
      </div>
      <div>
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
