import { getProductById } from "../Api/products.api";
import { useQuery } from "@tanstack/react-query";

export default function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
