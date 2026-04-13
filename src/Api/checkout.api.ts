import axios from "axios";
import type {
  CheckoutPayLoad,
  OnlineOrderResponse,
} from "../Types/checkout.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/orders";

export const createCashOrder = (
  token: string,
  cartId: string,
  payload: CheckoutPayLoad
) => {
  return axios.post(`${BASE_URL}/${cartId}`, payload, {
    headers: { token },
  });
};

export const createOnlineOrder = (
  token: string,
  cartId: string,
  payload: CheckoutPayLoad
) => {
  return axios.post<OnlineOrderResponse>(
    `${BASE_URL}/checkout-session/${cartId}?url=http://localhost:5173`,
    payload,
    {
      headers: { token },
    }
  );
};
