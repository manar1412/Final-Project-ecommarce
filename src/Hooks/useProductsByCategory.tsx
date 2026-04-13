import { getProducts } from "../Api/products.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useProductsByCategory(categoryId: string) {
  return useInfiniteQuery({
    queryKey: ["products", categoryId],
    queryFn: ({ pageParam }) =>
      getProducts(pageParam as number, 20, categoryId),
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < 20) return undefined;
      return allPages.length + 1;
    },
    enabled: !!categoryId,
  });
}
