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

  /**
   *  get id by role
   * @param role
   * @returns
   */
  static getIdByRole(role: string) {
    const query = this.queryBuilder()
      .select("id")
      .table(this.tableName)
      .where({ role: role });
    return query;
  }
}
