import { RoleAndPermissionModel } from "../models/rolesAndPermissions";

export async function getPermissionForRole(role_id: string) {
  return RoleAndPermissionModel.getPermissionForRole(role_id);
}
