import axios from "axios";

export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface CategoriesResponse {
  data: Category[];
}

export interface CategoryResponse {
  data: Category;
}

// Get all categories
export const getCategories = async (): Promise<CategoriesResponse> => {
  const { data } = await axios.get<CategoriesResponse>(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  return data;
};

// Get category by ID
export const getCategoryById = async (
  id: string
): Promise<CategoryResponse> => {
  const { data } = await axios.get<CategoryResponse>(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`
  );
  return data;
};
