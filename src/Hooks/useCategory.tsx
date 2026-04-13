import { getCategoryById } from "../Api/categories.api";
import { useQuery } from "@tanstack/react-query";

export default function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
}
