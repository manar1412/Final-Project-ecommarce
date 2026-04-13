import axios from "axios";
import type { SubcategoriesResponse } from "../Types/subcategory.types";

export const getSubcategoriesByCategory = async (
  categoryId: string
): Promise<SubcategoriesResponse> => {
  const { data } = await axios.get<SubcategoriesResponse>(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
  );
  return data;
};
