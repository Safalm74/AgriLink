import { RoleModel } from "../model/role";

export async function getRoleById(id:string){
    const role=await RoleModel.getRoleById(id);

    return role[0].role;
}