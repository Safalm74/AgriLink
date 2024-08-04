import { IGetProductQuery, IProduct } from "../interfaces/products";
import BaseModel from "./base";

export default class ProductModel extends BaseModel {
  static tableName = "products";

  /**
   * creates new product
   * @param product
   * @returns
   */
  static async create(product: IProduct) {
    const productToCreate = {
      farm_id: product.farmId,
      product_name: product.productName,
      price: product.price,
      quantity: product.quantity,
      quantityUnit: product.quantityUnit,
      description: product.description,
      image_url: product.imageUrl,
      category: product.category,
    };
    const query = this.queryBuilder()
      .insert(productToCreate)
      .table(this.tableName);

    await query;

    return productToCreate;
  }

  /**
   * reads product
   * @param filter
   * @returns
   */
  static get(filter: IGetProductQuery) {
    const { id: id, page, size, farmId, searchKeyword } = filter;

    const query = this.queryBuilder()
      .select(
        "id",
        "farmId",
        "productName",
        "price",
        "quantity",
        "quantity_unit",
        "description",
        "imageUrl",
        "category"
      )
      .table(this.tableName);
    if (page && size) {
      query.limit(size!).offset((page! - 1) * size!);
    }

    if (id) {
      query.where({ id: id });
    }

    if (farmId) {
      query.where({ farm_id: farmId });
    }

    if (searchKeyword) {
      query.where("product_name", "ILIKE", `%${searchKeyword}%`);
    }

    return query;
  }

  /**
   * updates product
   * @param id
   * @param product
   * @returns
   */
  static async update(id: string, product: IProduct) {
    const productToUpdate = {
      farm_id: product.farmId,
      product_name: product.productName,
      price: product.price,
      quantity: product.quantity,
      quantityUnit: product.quantityUnit,
      description: product.description,
      image_url: product.imageUrl,
      category: product.category,
    };
    const query = this.queryBuilder()
      .update(productToUpdate)
      .table(this.tableName)
      .where({ id: id });

    await query;

    return;
  }

  /**
   * deletes product
   * @param productId
   * @returns
   */
  static async delete(productId: string) {
    const query = this.queryBuilder()
      .delete()
      .table(this.tableName)
      .where({ id: productId });

    await query;

    return;
  }
}
