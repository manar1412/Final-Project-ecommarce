export interface Subcategory {
  _id: string;
  name: string;
  category: string;
}

export interface SubcategoriesResponse {
  data: Subcategory[];
}
