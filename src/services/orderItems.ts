import { IGetOrderItemsQuery, IOrderItems } from "../interfaces/orderItems";
import OrderItemsModel from "../models/orderItems";

export async function getOrderItem(filter: IGetOrderItemsQuery) {
  const data = await OrderItemsModel.get(filter);
  return data;
}

export async function createOrderItem(orderItem: IOrderItems) {
  const data = await OrderItemsModel.create(orderItem);
  return data;
}

export async function updateOrderItem(id: string, orderItem: IOrderItems) {
  const data = await OrderItemsModel.update(id, orderItem);
  return data;
}

export async function deleteOrderItem(id: string) {
  const data = await OrderItemsModel.delete(id);
  return data;
}
