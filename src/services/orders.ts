import { NotFoundError } from "../error/NotFoundError";
import { IOrderItems } from "../interfaces/orderItems";
import {
  ICreateOrderBody,
  IGetOrderQuery,
  IOrderForFarmer,
  IOrders,
  IUpdateOrderStatus,
} from "../interfaces/orders";
import { IUser } from "../interfaces/users";
import OrdersModel from "../models/orders";
import ProductModel from "../models/product";
import { UserModel } from "../models/user";
import { emptyCart } from "./cartItems";
import { getFarmByUserId } from "./farm";
import loggerWithNameSpace from "../utils/logger";
import { createOrderItem, getOrderItem } from "./orderItems";

const logger = loggerWithNameSpace("Orders service");

/**
 * function to create order
 * @param order
 */
export async function createOrder(order: ICreateOrderBody) {
  const { orderItems, farmId, customerId } = order;

  let totalPrice = 0;

  const orderToCreate: IOrders = {
    customerId,
    farmId,
    totalPrice: totalPrice,
  };

  logger.info("creating order");

  const orderId: IOrders = (await OrdersModel.create(orderToCreate))[0];

  if (!orderId) {
    throw new NotFoundError("failed to create order");
  }

  logger.info("creating order items");

  orderItems.forEach(async (orderItem) => {
    const orderItemToCreate: IOrderItems = {
      orderId: orderId.id!,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      unitPrice: orderItem.unitPrice,
    };

    logger.info("calculating total amount");

    totalPrice += orderItem.unitPrice * orderItem.quantity;

    logger.info("reducing product quantity");

    const productId = orderItem.productId;
    const productQuantity = orderItem.quantity;

    const product = (await ProductModel.get({ id: productId }))[0];

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    logger.info("checking product quantity");

    if (product.quantity < productQuantity) {
      throw new Error("Insufficient quantity");
    }

    logger.info("updating product quantity");

    product.quantity -= productQuantity;

    await ProductModel.update(product.id!, product);

    logger.info("creating order item");

    await createOrderItem(orderItemToCreate);
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

/**
 * get order by user
 * @param userId
 * @returns order details
 */
export async function getOrders(userId: string) {
  const data = await OrdersModel.get(userId);
  return data;
}

/**
 * get order for the farm
 * @param filter
 * @param userId
 * @returns order details
 */
export async function getOrderForFarm(filter: IGetOrderQuery, userId: string) {
  logger.info("getting farm orders");

  const { farmId } = filter;

  if (!farmId) {
    throw new NotFoundError("Farm Id is required");
  }

  logger.info("checking if farm exists");

  const existingUserFarms = (await getFarmByUserId(userId)).map(
    (farm) => farm.id
  );

  if (!existingUserFarms.includes(farmId)) {
    throw new NotFoundError("Farm not found");
  }

  logger.info("getting orders for farm");

  const orders: IOrders[] = await OrdersModel.getOrderForFarm(filter, farmId);

  logger.info("wrapping order items for farm with customer data");

  const data = await Promise.all(
    orders.map(async (order) => {
      const customerData = (
        await UserModel.get({ id: order.customerId })
      )[0] as IUser;

      const orderItem: IOrderForFarmer = {
        ...order,
        customerName: customerData.firstName + " " + customerData.lastName,
      };

      return orderItem;
    })
  );

  return data;
}

/**
 * function to update order
 * @param filter
 * @param order
 */
export async function updateOrder(filter: IGetOrderQuery, order: IOrders) {
  const { id } = filter;

  if (!id) {
    throw new NotFoundError("Order Id is required");
  }

  const data = await OrdersModel.update(id, order);
  return data;
}

/**
 * function to update order status
 * @param filter
 * @param status
 */
export async function updateOrderStatus(
  id: string,
  status: IUpdateOrderStatus
) {
  const { orderStatus } = status;

  if (!id) {
    throw new NotFoundError("Order Id is required");
  }

  if (!orderStatus) {
    throw new NotFoundError("Order Status is required");
  }

  const existingOrder = (await OrdersModel.getOrderById(id))[0];

  logger.info("checking if order exists");

  if (!existingOrder) {
    throw new NotFoundError("Order not found");
  }

  logger.info("checking if order can be updated");

  if (
    existingOrder.orderStatus === "delivered" ||
    existingOrder.orderStatus === "cancelled"
  ) {
    throw new Error("Order cannot be updated");
  }

  const data = await OrdersModel.updateStatus(id, orderStatus);

  if (orderStatus === "canceled") {
    const orderItems = (await getOrderItem({
      orderId: id,
    })) as IOrderItems[];

    logger.info("updating product quantity");

    orderItems.forEach(async (orderItem) => {
      const productId = await ProductModel.get({ id: orderItem.productId });
      const finalQuantity = +productId[0].quantity + +orderItem.quantity;
      await ProductModel.update(productId[0].id!, {
        ...productId[0],
        quantity: finalQuantity,
      });
    });
  }

  return data;
}

/**
 * function to delete order
 * @param filter
 */
export async function deleteOrder(id: string, userId: string) {
  if (!id) {
    throw new NotFoundError("Order Id is required");
  }

  const existingOrder = ((await OrdersModel.get(userId)) as IOrders[]).map(
    (order) => order.id
  );

  logger.info("checking if order exists");

  if (!existingOrder.includes(id)) {
    throw new NotFoundError("Order not found");
  }

  const data = await OrdersModel.delete(id);

  return data;
}
