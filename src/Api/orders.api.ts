import type { OrdersResponse } from "../Types/order.types";
import axiosInstance from "./axiosInstance";

export default function getUserOrders(userId: string) {
  return axiosInstance.get<OrdersResponse>(`/orders/user/${userId}`);
}
