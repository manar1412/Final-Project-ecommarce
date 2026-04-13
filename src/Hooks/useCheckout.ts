import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCashOrder, createOnlineOrder } from "../Api/checkout.api";
import { useAuth } from "../Context/AuthContext";
import type { CheckoutPayLoad } from "../Types/checkout.types";
import { useNavigate } from "react-router-dom";

interface CheckoutArgs {
  cartId: string;
  payload: CheckoutPayLoad;
}

export function useCheckout() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // 💵 Cash Order
  const cashMutation = useMutation({
    mutationFn: ({ cartId, payload }: CheckoutArgs) =>
      createCashOrder(token!, cartId, payload),

    onSuccess: () => {
      toast.success("Order placed successfully 🎉");
      navigate("/allorders");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      toast.error("Failed to place cash order");
    },
  });

  // 💳 Online Order
  const onlineMutation = useMutation({
    mutationFn: ({ cartId, payload }: CheckoutArgs) =>
      createOnlineOrder(token!, cartId, payload),

    onSuccess: (res) => {
      toast.loading("Redirecting to payment...");
      setTimeout(() => {
        window.location.href = res.data.session.url;
      }, 1500);
    },

    onError: () => {
      toast.error("Payment initialization failed");
    },
  });

  return {
    createCashOrder: cashMutation.mutate,
    createOnlineOrder: onlineMutation.mutate,

    isCashLoading: cashMutation.isPending,
    isOnlineLoading: onlineMutation.isPending,

    isCashSucces: cashMutation.isSuccess,
  };
}
