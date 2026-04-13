export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
}

export interface CartItem {
  _id: string;
  price: number;
  count: number;
  product: OrderProduct;
}

export interface Order {
  _id: string;
  id: number;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  cartItems: CartItem[];
  createdAt: string;
}

export type OrdersResponse = Order[];
