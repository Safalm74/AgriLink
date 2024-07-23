import { RoleModel } from "../models/role";

/**
 * function to get role name by role id
 * @param id
 * @returns
 */
export async function getRoleById(id: string) {
  const role = await RoleModel.getRoleById(id);

  return role[0].role;
}
