import BaseModel from "./base";

const table_name = "roles";
export class RoleModel extends BaseModel {
  static getRoleById(id: string) {
    const query = this.queryBuilder()
      .select("role")
      .table(table_name)
      .where({ id: id });
    return query;
  }
}
