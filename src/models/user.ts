import { IGetUserQuery, IUser } from "../interfaces/users";
import BaseModel from "./base";

export class UserModel extends BaseModel {
  static TABLE_NAME = "users";
  /**
   * creates new user
   * @param user
   * @param createdById
   * @returns
   */
  static async create(user: IUser, createdById: string = "") {
    const userToCreate = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      roleId: user.roleId,
      createdBy: createdById,
      address: user.address,
    };

    await this.queryBuilder().insert(userToCreate).table(this.TABLE_NAME);

    return user;
  }

  /**
   * reads user
   * @param filter
   * @returns
   */
  static get(filter: IGetUserQuery) {
    const { id: id, page, size } = filter;
    const query = this.queryBuilder()
      .select("id", "email", "first_name", "last_name", "role_id")
      .table(this.TABLE_NAME)
      .limit(size!)
      .offset((page! - 1) * size!);

    if (id) {
      query.where({ id: id });
    }

    return query;
  }

  /**
   * reads user by email
   * @param email
   * @returns
   */
  static getUserByEmail(email: string) {
    const query = this.queryBuilder()
      .select("id", "email", "first_name", "last_name", "password", "role_id")
      .table(this.TABLE_NAME)
      .where({ email: email });
    return query;
  }

  // static async update(id:string,user:IUser){
  //   const userToUpdate={
  //     name:user.name,
  //     email:user.email,
  //     password:user.password,
  //     updated_at:new Date()
  //   }

  //   const query =this.queryBuilder().update(userToUpdate).table(this.TABLE_NAME).where({id});

  //   await query;

  //   return;
  // }

  /**
   * deletes user
   * @param UserToDeleteId
   * @returns
   */
  static async delete(UserToDeleteId: string) {
    const query = this.queryBuilder()
      .delete()
      .table(this.TABLE_NAME)
      .where({ id: UserToDeleteId });

    await query;

    return;
  }
}
