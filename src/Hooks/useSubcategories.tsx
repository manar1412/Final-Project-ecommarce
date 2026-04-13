import { useQuery } from "@tanstack/react-query";
import { getSubcategoriesByCategory } from "../Api/subcategories.api";

export default function useSubcategories(categoryId: string) {
  return useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => getSubcategoriesByCategory(categoryId),
    enabled: !!categoryId,
  });
}
