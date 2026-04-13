import { useFormik } from "formik";
import { Loader2, CreditCard, Banknote, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../Hooks/useCart";
import { useCheckout } from "../../Hooks/useCheckout";

export default function Checkout() {
  const { cart } = useCart();
  const { createCashOrder, createOnlineOrder, isCashLoading, isOnlineLoading } =
    useCheckout();

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        city: "",
        phone: "",
        details: "",
      },
    },

    onSubmit: () => {},
  });

  if (!cart) return null;

  const cartId = cart.data._id;

  const validateForm = () => {
    const { city, phone, details } = formik.values.shippingAddress;

    if (!city || !phone || !details) {
      toast.error("Please fill all shipping fields");
      return false;
    }

    if (phone.length < 10) {
      toast.error("Invalid phone number");
      return false;
    }

    return true;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form className="bg-white rounded-xl shadow p-6 space-y-4">
        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="City"
            name="shippingAddress.city"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            className="w-full pl-10 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="tel"
            placeholder="Phone"
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            className="w-full pl-10 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Details */}
        <textarea
          placeholder="Address Details"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          className="w-full border rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-blue-500"
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          {/* 💵 Cash */}
          <button
            type="button"
            disabled={isCashLoading || isOnlineLoading}
            onClick={() => {
              if (!validateForm()) return;

              createCashOrder({
                cartId,
                payload: formik.values,
              });
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-60 cursor-pointer"
          >
            {isCashLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Banknote />
                Cash Order
              </>
            )}
          </button>

          {/* 💳 Online */}
          <button
            type="button"
            disabled={isCashLoading || isOnlineLoading}
            onClick={() => {
              if (!validateForm()) return;

              createOnlineOrder({
                cartId,
                payload: formik.values,
              });
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer"
          >
            {isOnlineLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <CreditCard />
                Online Payment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
