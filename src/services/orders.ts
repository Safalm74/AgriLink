import { NotFoundError } from "../error/NotFoundError";
import { IOrderItems } from "../interfaces/orderItems";
import {
  ICreateOrderBody,
  IGetOrderQuery,
  IOrders,
} from "../interfaces/orders";
import OrderItemsModel from "../models/orderItems";
import OrdersModel from "../models/orders";
import { emptyCart } from "./cartItems";

export async function getOrders(userId: string) {
  const data = await OrdersModel.get(userId);
  return data;
}

export async function createOrder(order: ICreateOrderBody) {
  const { orderItems, farmId, customerId } = order;

  let totalPrice = 0;

  const orderToCreate: IOrders = {
    customerId,
    farmId,
    totalPrice: totalPrice,
  };

  const orderId: IOrders = (await OrdersModel.create(orderToCreate))[0];

  if (!orderId) {
    throw new NotFoundError("failed to create order");
  }

  orderItems.forEach(async (orderItem) => {
    const orderItemToCreate: IOrderItems = {
      orderId: orderId.id!,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      unitPrice: orderItem.unitPrice,
    };

    totalPrice += orderItem.unitPrice * orderItem.quantity;

    await OrderItemsModel.create(orderItemToCreate);
  });

  const orderToUpdate: IOrders = {
    customerId,
    farmId,
    totalPrice: totalPrice,
  };

  updateOrder({ id: orderId.id! }, orderToUpdate);

  emptyCart(customerId);

  return order;
}

export async function updateOrder(filter: IGetOrderQuery, order: IOrders) {
  const { id } = filter;

  if (!id) {
    throw new NotFoundError("Order Id is required");
  }

  const data = await OrdersModel.update(id, order);
  return data;
}

export async function deleteOrder(filter: IGetOrderQuery) {
  const { id } = filter;

  if (!id) {
    throw new NotFoundError("Order Id is required");
  }

  const data = await OrdersModel.delete(id);
  return data;
}
