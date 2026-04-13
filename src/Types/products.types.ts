export interface Product {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: {
    _id: string;
    name: string;
  };
}

export interface ProductCardProps {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage?: number;
}

export interface ProductsResponse {
  data: Product[];
  results: number;
}

export interface ProductResponse {
  data: Product;
}

export interface GetFilteredProductsParams {
  page: number;
  limit?: number;
  categoryId?: string;
  subcategoryId?: string;
}
