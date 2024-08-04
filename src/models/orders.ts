import { IGetOrderQuery, IOrders } from "../interfaces/orders";
import BaseModel from "./base";

export default class OrdersModel extends BaseModel {
  static tableName = "orders";

  static async get(customerId: string) {
    const query = this.queryBuilder()
      .select(
        "id",
        "customer_id",
        "farm_id",
        "order_date",
        "order_status",
        "total_price"
      )
      .table(this.tableName)
      .where({ customer_id: customerId });

    return await query;
  }

  static async getOrderById(id: string) {
    const query = this.queryBuilder()
      .select("*")
      .table(this.tableName)
      .where({ id: id });

    return await query;
  }

  static async getOrderForFarm(filter: IGetOrderQuery, farmId: string) {
    const { page, size } = filter;
    const query = this.queryBuilder()
      .select(
        "id",
        "customer_id",
        "farm_id",
        "order_date",
        "order_status",
        "total_price"
      )
      .table(this.tableName)
      .where({ farm_id: farmId });

    if (page && size) {
      query.limit(size!).offset((page! - 1) * size!);
    }

    return await query;
  }

  static async create(order: IOrders) {
    const orderToCreate = {
      customerId: order.customerId,
      farmId: order.farmId,
      totalPrice: order.totalPrice,
    };
    const query = this.queryBuilder()
      .insert(orderToCreate)
      .table(this.tableName)
      .returning("*");

    console.log(orderToCreate, "creating order");

    return await query;
  }

  static async update(id: string, order: IOrders) {
    const orderToUpdate = {
      customer_id: order.customerId,
      farm_id: order.farmId,
      total_price: order.totalPrice,
    };

    const query = this.queryBuilder()
      .update(orderToUpdate)
      .table(this.tableName)
      .where({ id: id })
      .returning("*");

    return await query;
  }

  static async updateStatus(id: string, status: string) {
    const query = this.queryBuilder()
      .update({ orderStatus: status })
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
