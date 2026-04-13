import axios from "axios";
import type { WishListResponse } from "../Types/wishlist.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export const getWishList = (token: string) => {
  return axios.get<WishListResponse>(BASE_URL, {
    headers: { token },
  });
};

export const addToWishList = (token: string, productId: string) => {
  return axios.post<WishListResponse>(
    BASE_URL,
    { productId },
    {
      headers: { token },
    }
  );
};

export const removeFromWishList = (token: string, productId: string) => {
  return axios.delete<WishListResponse>(`${BASE_URL}/${productId}`, {
    headers: { token },
  });
};
