import { useAuth } from "../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WishListResponse } from "../Types/wishlist.types";
import {
  addToWishList,
  getWishList,
  removeFromWishList,
} from "../Api/wishlist.api";
import toast from "react-hot-toast";
import { useState } from "react";

export function useWishList() {
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // =============================
  // Get Wishlist
  // =============================

  const wishlistQuery = useQuery<WishListResponse>({
    queryKey: ["wishlist"],
    queryFn: () => getWishList(token!).then((res) => res.data),
    enabled: !!token,
  });

  // =============================
  // Add to Wishlist
  // =============================

  const addMutation = useMutation({
    mutationFn: (productId: string) => addToWishList(token!, productId),
    onSuccess: () => {
      toast.success("Added to wishlist ❤️");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  // =============================
  // Remove from Wishlist
  // =============================

  const removeMutation = useMutation({
    mutationFn: (productId: string) => {
      setRemovingId(productId);
      return removeFromWishList(token!, productId);
    },
    onSuccess: () => {
      toast.success("Removed from wishlist 🗑️");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onSettled: () => setRemovingId(null),
  });

  return {
    wishlist: wishlistQuery.data,
    isLoading: wishlistQuery.isLoading,
    isFetchingToWishlist: wishlistQuery.isFetching,
    addToWishList: addMutation.mutate,
    removeFromWishList: removeMutation.mutate,
    isAddingToWishList: addMutation.isPending,
    isRemovingFromWishlist: removeMutation.isPending,
    removingId,
  };
}
