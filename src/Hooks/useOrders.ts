import { useAuth } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";

import { jwtDecode } from "jwt-decode";
import getUserOrders from "../Api/orders.api";

interface DecodedToken {
  id: string;
}

export default function useOrders() {
  const { token } = useAuth();

  const userId = token ? jwtDecode<DecodedToken>(token).id : null;

  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders(userId!).then((res) => res.data),
    enabled: !!userId,
  });
}
