import * as UserModel from "../models/user";
import bcrypt from "bcrypt";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";
import { IGetUserQuery, IUser } from "../interfaces/users";
import { getIdByRole, getRoleById } from "./role";

const logger = loggerWithNameSpace("User Service");

/**
 * service function to create new user
 * @param user
 * @param createdById
 * @returns
 */
export async function createUser(user: IUser) {
  logger.info("create user");

  let newUser: IUser;

  //async for using hash of bcrypt
  logger.info("Attempting to add user");

  logger.info(`comparing incomming email with existing emails`);

  //to prevent multiple user with same email
  if ((await UserModel.UserModel.getUserByEmail(user.email)).length !== 0) {
    logger.error(`Email is already used:${user.email}`);

    throw new BadRequestError("Email is already used");
  }

  const hashSaltValue = 10;

  const password = await bcrypt.hash(user.password, hashSaltValue); //hashing password

  newUser = {
    ...user,
    password,
  };

  if (user.roleId) {
    newUser = {
      ...newUser,
      roleId: await getIdByRole(user.roleId),
    };
  }

  //creating new user
  UserModel.UserModel.create(newUser);

  return { msg: "User Created" };
}

/**
 * service function to return users
 * @param query
 * @returns
 */
export async function getUsers(query: IGetUserQuery) {
  return UserModel.UserModel.get(query);
}

/**
 * service function to return user by email
 * @param email
 * @returns
 */
export function getUserByEmail(email: string) {
  logger.info("Attempting to get user by email");
  return UserModel.UserModel.getUserByEmail(email);
}

/**
 * service to handle delete user
 * @param UserId
 * @returns
 */
export async function deleteUser(UserId: string) {
  logger.info("Attempting to delete user by id");

  const data = await UserModel.UserModel.get({ id: UserId, page: 1, size: 1 });

  if (data.length === 0) {
    logger.error("user not found");

    throw new NotFoundError("user not found");
  }

  UserModel.UserModel.delete(UserId);

  return { msg: `User Deleted: ${UserId}` };
}
