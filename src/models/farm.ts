import { IFarm, IGetFarmQuery } from "../interfaces/farm";
import BaseModel from "./base";

export default class FarmModel extends BaseModel {
  static tableName = "farms";

  /**
   * creates new farm
   * @param farm
   * @returns
   */
  static async create(farm: IFarm) {
    const farmToCreate = {
      user_id: farm.userId,
      farm_name: farm.farmName,
      farm_address: farm.farmAddress,
    };
    const query = this.queryBuilder()
      .insert(farmToCreate)
      .table(this.tableName)
      .returning("id");

    return await query;
  }

  /**
   * reads farm
   * @param filter
   * @returns
   */
  static async get(filter: IGetFarmQuery) {
    const { id: id, page, size } = filter;
    const query = this.queryBuilder()
      .select("id", "farm_name", "farm_address", "user_id")
      .table(this.tableName)
      .limit(size!)
      .offset((page! - 1) * size!);

    if (id) {
      query.where({ id: id });
    }

    return query;
  }

  /**
   * @returns all farms
   */
  static async getAll() {
    const query = this.queryBuilder().select("farm_name").table(this.tableName);
    return query;
  }

  /**
   * returns user farms
   * @param farmerId
   * @returns
   */
  static async getFarmByUserId(farmerId: string) {
    const query = this.queryBuilder()
      .select("id", "farm_name", "farm_address")
      .table(this.tableName)
      .where({ user_id: farmerId });
    return query;
  }

  /**
   * updates farm
   * @param farmId
   * @param farm
   * @returns
   */
  static async update(farmId: string, farm: IFarm) {
    const farmToUpdate = {
      farm_name: farm.farmName,
      farm_address: farm.farmAddress,
    };
    const query = this.queryBuilder()
      .update(farmToUpdate)
      .table(this.tableName)
      .where({ id: farmId })
      .returning("id");

    return await query;
  }

  /**
   * deletes farm
   * @param farmId
   * @returns
   */
  static async delete(farmId: string) {
    const query = this.queryBuilder()
      .delete()
      .table(this.tableName)
      .where({ id: farmId });
    await query;

    return;
  }
}
