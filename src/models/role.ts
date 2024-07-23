import BaseModel from "./base";

export class RoleModel extends BaseModel {
  static tableName = "roles";
  /**
   * get role name by role id
   * @param id
   * @returns
   */
  static getRoleById(id: string) {
    const query = this.queryBuilder()
      .select("role")
      .table(this.tableName)
      .where({ id: id });
    return query;
  }
}
