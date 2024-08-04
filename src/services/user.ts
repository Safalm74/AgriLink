import * as UserModel from "../models/user";
import bcrypt from "bcrypt";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";
import { IGetUserQuery, IUser } from "../interfaces/users";
import { getIdByRole } from "./role";
import { IFarm } from "../interfaces/farm";
import FarmModel from "../models/farm";

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

  logger.info(`comparing incoming email with existing emails`);

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

export async function updateUser(id: string, user: IUser) {
  const existingUser = (await getUsers({ id: id }))[0];

  if (!existingUser) {
    throw new NotFoundError("user not found");
  }

  return UserModel.UserModel.update(id, user);
}

export async function changeCustomerToFarmer(
  id: string,
  farmDetails: Omit<IFarm, "userId">
) {
  logger.info("Attempting to change customer to farmer");

  const existingUser = (await getUsers({ id: id }))[0];

  if (!existingUser) {
    throw new NotFoundError("user not found");
  }

  const farmToCreate: IFarm = {
    userId: existingUser.id,
    ...farmDetails,
  };

  const farmerRoleId = await getIdByRole("farmer");

  if (existingUser.roleId === farmerRoleId) {
    throw new BadRequestError("user is already farmer");
  }

  logger.info("Changing customer to farmer");

  const data = await UserModel.UserModel.updateRole(id, farmerRoleId);

  logger.info("Updating farm details");

  await FarmModel.create(farmToCreate);

  return data;
}

/**
 * service to handle delete user
 * @param UserId
 * @returns
 */
export async function deleteUser(userId: string) {
  logger.info("Attempting to delete user by id");

  if (!userId) {
    throw new BadRequestError("id is required");
  }

  const existingUser = (
    await UserModel.UserModel.get({ id: userId, page: 1, size: 1 })
  )[0];

  if (!existingUser) {
    logger.error("user not found");

    throw new NotFoundError("user not found");
  }

  UserModel.UserModel.delete(userId);

  return { msg: `User Deleted: ${userId}` };
}
