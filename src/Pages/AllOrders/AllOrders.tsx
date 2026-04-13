import { Link } from "react-router-dom";
import useOrders from "../../Hooks/useOrders";
import Loading from "../../Components/Loading/Loading";

export default function AllOrders() {
  const { data: orders, isLoading, isError, isPending } = useOrders();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load orders ❌</p>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-bold">#{order.id}</p>
              </div>

              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    order.isDelivered ? "bg-green-600" : "bg-blue-600"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Shipping"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    order.isPaid ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-lg border p-3 text-center"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="h-24 w-full object-contain"
                  />
                  <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                    {item.product.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.price} LE</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Link to="/" className="flex justify-center py-10">
          <button
            disabled={isPending}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </Link>
      </div>
    </>
  );
}
