import { getCategories } from "../Api/categories.api";
import { useQuery } from "@tanstack/react-query";
import type { CategoriesResponse } from "../Api/categories.api";

export default function useCategories() {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000, // 5 minutes
  });
}
