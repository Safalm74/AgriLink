import BaseModel from "./base";

export class RoleAndPermissionModel extends BaseModel {
  static async getPermissionForRole(role_id: string) {
    const query = this.queryBuilder()
      .join(
        "permissions",
        "permissions.id",
        "roles_and_permissions.permission_id"
      )
      .select("permissions.permissions")
      .table("roles_and_permissions")
      .where({ roleId: role_id });

    return query;
  }
}
