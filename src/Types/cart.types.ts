export interface CartProductInfo {
  _id: string;
  title: string;
  imageCover: string;
}

export interface CartProduct {
  _id: string; // cart item id
  count: number;
  price: number;
  product: CartProductInfo;
}

export interface CartData {
  _id: string; // cart id
  products: CartProduct[];
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}

export interface UpdateCountPayLoad {
  productId: string;
  count: number;
}
