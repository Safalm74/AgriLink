import { IGetOrderItemsQuery, IOrderItems } from "../interfaces/orderItems";
import OrderItemsModel from "../models/orderItems";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Order Items service");

/**
 * function to get item on order
 * @param filter
 * @returns order item
 */
export async function getOrderItem(filter: IGetOrderItemsQuery) {
  const data = await OrderItemsModel.get(filter);
  return data;
}

/**
 * function to create order item
 * @param orderItem
 */
export async function createOrderItem(orderItem: IOrderItems) {
  const data = await OrderItemsModel.create(orderItem);
  return data;
}

/**
 * function to update order item
 * @param id
 * @param orderItem
 */
export async function updateOrderItem(id: string, orderItem: IOrderItems) {
  const data = await OrderItemsModel.update(id, orderItem);
  return data;
}

/**
 * function to delete order item
 * @param id
 */
export async function deleteOrderItem(id: string) {
  const data = await OrderItemsModel.delete(id);
  return data;
}
