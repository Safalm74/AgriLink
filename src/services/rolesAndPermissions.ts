import { RoleAndPermissionModel } from "../models/rolesAndPermissions";

/**
 *  function to get permissions for role
 * @param role_id
 * @returns permissions
 */
export async function getPermissionForRole(role_id: string) {
  return RoleAndPermissionModel.getPermissionForRole(role_id);
}
