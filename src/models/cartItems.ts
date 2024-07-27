import {
  ICreateCartItemBody,
  IGetCartItemQuery,
} from "../interfaces/cartItems";
import BaseModel from "./base";

export default class CartItemModel extends BaseModel {
  static tableName = "cart_items";

  static async create(cartItem: ICreateCartItemBody) {
    const cartItemToCreate = {
      product_id: cartItem.productId,
      user_id: cartItem.userId,
      quantity: cartItem.quantity,
    };

    console.log("in model", cartItemToCreate);
    const query = this.queryBuilder()
      .insert(cartItemToCreate)
      .into(this.tableName);
    return query;
  }

  static async get(filter: IGetCartItemQuery, userId: string) {
    console.log(userId, filter);
    const { id: id, page, size } = filter;
    const query = this.queryBuilder()
      .select("id", "product_id", "quantity")
      .table(this.tableName)
      .limit(size!)
      .offset((page! - 1) * size!)
      .where({ user_id: userId });
    if (id) {
      query.where({ id: id });
    }

    return query;
  }

  static async getCartIdByProductId(productId: string, userId: string) {
    try {
      const query = this.queryBuilder()
        .select("id", "quantity")
        .from(this.tableName)
        .where({
          product_id: productId,
        });
      return await query;
    } catch (err) {
      console.log(err);
    }
  }

  static async update(
    id: string,
    cartItem: ICreateCartItemBody,
    userId: string
  ) {
    const query = this.queryBuilder()
      .update(cartItem)
      .from(this.tableName)
      .where({ id: id, userId: userId });
    return query;
  }

  static async deleteCartItem(id: string) {
    const query = this.queryBuilder()
      .delete()
      .from(this.tableName)
      .where({ id: id });
    return query;
  }
}
