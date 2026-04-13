import toast from "react-hot-toast";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItems,
} from "../Api/cart.api";
import { useAuth } from "../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CartResponse, UpdateCountPayLoad } from "../Types/cart.types";
import { useState } from "react";

export function useCart() {
  const [addingId, setAddingId] = useState<string | null>(null);
  const [updatingIds, setUpdatingIds] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { token } = useAuth();
  const queryClient = useQueryClient();

  //=============================
  // Get Cart
  //=============================
  const cartQuery = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: () => getCart(token!).then((res) => res.data),
    enabled: !!token,
    retry: false,
  });

  //=============================
  // Add Product
  //=============================
  const addMutation = useMutation({
    mutationFn: (productId: string) => {
      setAddingId(productId);
      return addToCart(token!, productId);
    },
    onSuccess: () => {
      toast.success("Product Added To Cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => setAddingId(null),
  });

  //=============================
  // Remove Product
  //=============================
  const removeMutation = useMutation({
    mutationFn: (productId: string) => {
      setRemovingId(productId);
      return removeFromCart(token!, productId);
    },
    onSuccess: () => {
      toast.success("Product Removed From Cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => setRemovingId(null),
  });

  //=============================
  // Update Product Count
  //=============================
  const updateMutation = useMutation({
    mutationFn: ({ productId, count }: UpdateCountPayLoad) => {
      setUpdatingIds((prev) => ({ ...prev, [productId]: true }));
      return updateCartItems(token!, productId, count);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onSettled: (_data, _error, variables) => {
      const productId = variables.productId;
      setUpdatingIds((prev) => ({ ...prev, [productId]: false }));
    },
  });

  //=============================
  // Clear Cart
  //=============================
  const clearMutation = useMutation({
    mutationFn: () => clearCart(token!),
    onSuccess: () => {
      toast.success("Cart Cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    cart: cartQuery.data,
    isError: cartQuery.isError,
    isLoading: cartQuery.isLoading,
    isFetching: cartQuery.isFetching,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    addToCart: addMutation.mutate,
    removeFromCart: removeMutation.mutate,
    updateCart: updateMutation.mutate,
    clearCart: clearMutation.mutate,
    clearAllCart: clearMutation.isPending,
    addingId,
    updatingIds,
    removingId,
  };
}
