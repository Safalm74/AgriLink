import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { IFarm, IGetFarmQuery } from "../interfaces/farm";
import FarmModel from "../models/farm";
import { getRoleById } from "./role";
import { getUsers } from "./user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Farm service");

/**
 * Function to create a new farm
 * @param farm
 */
export async function createFarm(farm: IFarm, userId: string) {
  if (!userId) {
    throw new BadRequestError("Farmer Id is required");
  }

  const existingUser = (await getUsers({ id: userId, page: 1, size: 1 }))[0];

  logger.info("checking if user exists");

  if (!existingUser) {
    throw new NotFoundError("Farmer not found");
  }

  const userRole = await getRoleById(existingUser.roleId);

  logger.info("checking if user is farmer");

  if (userRole !== "farmer") {
    throw new BadRequestError("Only farmer can have farm");
  }

  const existingFarms = (await getAllFarms()).map((farm) => farm.farmName);

  logger.info("checking if farm name already exists");

  if (existingFarms.includes(farm.farmName)) {
    throw new BadRequestError("Farm name already exists");
  }

  return await FarmModel.create({ ...farm, userId: userId });
}

/**
 * Function to get farm
 * @param filter
 * @returns farm details
 */
export async function getFarms(filter: IGetFarmQuery) {
  return await FarmModel.get(filter);
}

/**
 * Function to get all farms
 */
export async function getAllFarms() {
  return await FarmModel.getAll();
}

/**
 * get all farms for the user
 * @param farmerId
 * @returns farm details
 */
export async function getFarmByUserId(farmerId: string) {
  return await FarmModel.getFarmByUserId(farmerId);
}

/**
 * Function to update farm
 * @param filter
 * @param farm
 */
export async function updateFarm(farmId: string, farm: IFarm, userId: string) {
  if (!farmId) {
    throw new BadRequestError("Farm Id is required");
  }

  const existingFarms = (await getAllFarms()).map((farm) => farm.farmName);

  logger.info("checking if farm name already exists");

  if (existingFarms.includes(farm.farmName)) {
    throw new BadRequestError("Farm name already exists");
  }

  return await FarmModel.update(farmId, farm);
}

/**
 * Function to delete farm
 * @param farm
 */
export async function deleteFarm(farmId: string, userId: string, role: string) {
  const userFarms = (await getFarmByUserId(userId)).map((farm) => farm.id);
  const userRole = await getRoleById(role);
  const existingFarms = (await getAllFarms()).map((farm) => farm.id);

  logger.info("checking if farm exists");

  if (!existingFarms) {
    throw new NotFoundError("Farm not found");
  }

  if (!farmId) {
    throw new BadRequestError("Farm Id is required");
  }

  logger.info("checking if farm belongs to user and user is admin");

  if (!userFarms.includes(farmId) && userRole !== "admin") {
    throw new NotFoundError("Farm not found");
  }

  return await FarmModel.delete(farmId);
}
