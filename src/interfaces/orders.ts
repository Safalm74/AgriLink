export interface IGetOrderQuery {
  id?: string;
  customerId?: string;
  farmId?: string;
  page?: number;
  size?: number;
}

interface IorderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface ICreateOrderBody {
  id?: string;
  customerId: string;
  farmId: string;
  orderItems: IorderItem[];
  totalPrice?: number;
}

export interface IOrders {
  id?: string;
  customerId: string;
  farmId: string;
  totalPrice: number;
  orderDate?: Date;
  orderStatus?: string;
}
