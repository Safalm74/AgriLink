import { NotFoundError } from "../error/NotFoundError";
import { RoleModel } from "../models/role";

/**
 * function to get role name by role id
 * @param id
 * @returns
 */
export async function getRoleById(id: string) {
  const role = (await RoleModel.getRoleById(id))[0].role;

  if (!role) {
    throw new NotFoundError("role not found");
  }

  return role;
}

export async function getIdByRole(role: string) {
  const id = (await RoleModel.getIdByRole(role))[0].id;

  if (!id) {
    throw new NotFoundError("role not found");
  }

  return id;
}
