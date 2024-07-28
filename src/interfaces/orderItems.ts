export interface IOrderItems {
  id?: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface IGetOrderItemsQuery {
  id?: string;
  orderId?: string;
  page?: number;
  size?: number;
}
