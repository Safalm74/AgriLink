import { IGetOrderItemsQuery, IOrderItems } from "../interfaces/orderItems";
import BaseModel from "./base";

export default class OrderItemsModel extends BaseModel {
  static tableName = "order_items";

  static async get(filter: IGetOrderItemsQuery) {
    const { id, page, size, orderId } = filter;

    console.log(filter);
    const query = this.queryBuilder()
      .select("id", "order_id", "product_id", "quantity", "unit_price")
      .table(this.tableName)
      .limit(size!)
      .offset((page! - 1) * size!);
    if (id) {
      query.where({ id: id });
    }
    if (orderId) {
      query.where({ order_id: orderId });
    }

    return await query;
  }

  static async create(orderItem: IOrderItems) {
    const orderItemsToCreate = {
      orderId: orderItem.orderId,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      unitPrice: orderItem.unitPrice,
    };
    const query = this.queryBuilder()
      .insert(orderItemsToCreate)
      .table(this.tableName)
      .returning("*");

    return await query;
  }

  static async update(id: string, orderItem: IOrderItems) {
    const orderItemsToUpdate = {
      orderId: orderItem.orderId,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      unit_price: orderItem.unitPrice,
    };
    const query = this.queryBuilder()
      .update(orderItemsToUpdate)
      .table(this.tableName)
      .where({ id: id })
      .returning("*");

    return await query;
  }

  static async delete(id: string) {
    const query = this.queryBuilder()
      .delete()
      .table(this.tableName)
      .where({ id: id })
      .returning("*");

    return await query;
  }
}
