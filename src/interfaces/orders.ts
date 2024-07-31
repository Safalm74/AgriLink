export interface IGetOrderQuery {
  id?: string;
  customerId?: string;
  farmId?: string;
  page?: number;
  size?: number;
}

interface IOrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface ICreateOrderBody {
  id?: string;
  customerId: string;
  farmId: string;
  orderItems: IOrderItem[];
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

export interface IUpdateOrderStatus {
  orderStatus: string;
}

export interface IOrderForFarmer extends IOrders {
  customerName: string;
}
