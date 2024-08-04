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
import OrderItemsModel from "../models/orderItems";
import OrdersModel from "../models/orders";
import ProductModel from "../models/product";
import { UserModel } from "../models/user";
import { emptyCart } from "./cartItems";
import { getFarmByUserId } from "./farm";

/**
 * get order by user
 * @param userId
 * @returns
 */
export async function getOrders(userId: string) {
  const data = await OrdersModel.get(userId);
  return data;
}

/**
 * get order for the farm
 * @param filter
 * @param userId
 * @returns
 */
export async function getOrderForFarm(filter: IGetOrderQuery, userId: string) {
  const { farmId } = filter;

  if (!farmId) {
    throw new NotFoundError("Farm Id is required");
  }

  const existingUserFarms = (await getFarmByUserId(userId)).map(
    (farm) => farm.id
  );

  if (!existingUserFarms.includes(farmId)) {
    throw new NotFoundError("Farm not found");
  }

  const orders: IOrders[] = await OrdersModel.getOrderForFarm(filter, farmId);

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
 * function to create order
 * @param order
 * @returns
 */
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

    //reducing product quantity
    const productId = orderItem.productId;
    const productQuantity = orderItem.quantity;
    const product = (await ProductModel.get({ id: productId }))[0];

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (product.quantity < productQuantity) {
      throw new Error("Insufficient quantity");
    }

    product.quantity -= productQuantity;

    await ProductModel.update(product.id!, product);

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

/**
 * function to update order
 * @param filter
 * @param order
 * @returns
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

  if (!existingOrder) {
    throw new NotFoundError("Order not found");
  }

  if (
    existingOrder.orderStatus === "delivered" ||
    existingOrder.orderStatus === "cancelled"
  ) {
    throw new Error("Order cannot be updated");
  }

  const data = await OrdersModel.updateStatus(id, orderStatus);

  if (orderStatus === "canceled") {
    const orderItems = (await OrderItemsModel.get({
      orderId: id,
    })) as IOrderItems[];

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
 * @returns
 */
export async function deleteOrder(id: string, userId: string) {
  if (!id) {
    throw new NotFoundError("Order Id is required");
  }

  const existingOrder = ((await OrdersModel.get(userId)) as IOrders[]).map(
    (order) => order.id
  );

  if (!existingOrder.includes(id)) {
    throw new NotFoundError("Order not found");
  }

  const data = await OrdersModel.delete(id);

  return data;
}
