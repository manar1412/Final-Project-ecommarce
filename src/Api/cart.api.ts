import axios from "axios";
import type { CartResponse } from "../Types/cart.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";

export const getCart = (token: string) => {
  return axios.get<CartResponse>(BASE_URL, { headers: { token } });
};

export const addToCart = (token: string, productId: string) => {
  return axios.post<CartResponse>(
    BASE_URL,
    { productId },
    { headers: { token } }
  );
};

export const removeFromCart = (token: string, productId: string) => {
  return axios.delete<CartResponse>(`${BASE_URL}/${productId}`, {
    headers: { token },
  });
};

export const updateCartItems = (
  token: string,
  productId: string,
  count: number
) => {
  return axios.put<CartResponse>(
    `${BASE_URL}/${productId}`,
    { count },
    { headers: { token } }
  );
};

export const clearCart = (token: string) => {
  return axios.delete<{ message: string }>(BASE_URL, {
    headers: { token },
  });
};
