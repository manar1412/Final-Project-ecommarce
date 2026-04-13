import { getProducts, getFilteredProducts } from "../Api/products.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "../Types/products.types";

interface UseProductsFilters {
  categoryId?: string;
  subcategoryId?: string;
}

export default function useProducts(filters?: UseProductsFilters) {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["products", filters],
    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      if (!filters?.categoryId && !filters?.subcategoryId) {
        return getProducts(pageParam as number, 20);
      }

      return getFilteredProducts({
        page: pageParam as number,
        categoryId: filters?.categoryId,
        subcategoryId: filters?.subcategoryId,
      });
    },

    getNextPageParam: (lastPage, allPages): number | undefined => {
      if (lastPage.data.length < 20) return undefined;
      return allPages.length + 1;
    },
  });
}
