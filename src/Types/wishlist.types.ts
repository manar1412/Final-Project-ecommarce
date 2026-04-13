export interface WishListProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
}

export interface WishListResponse {
  status: string;
  count: number;
  data: WishListProduct[];
}
