export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CheckoutPayLoad {
  shippingAddress: ShippingAddress;
}

export interface OnlineOrderResponse {
  status: string;
  session: {
    url: string;
  };
}
