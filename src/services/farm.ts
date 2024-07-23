import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { IFarm, IGetFarmQuery } from "../interfaces/farm";
import FarmModel from "../models/farm";
import { getRoleById } from "./role";
import { getUsers } from "./user";

/**
 * Function to create a new farm
 * @param farm
 * @returns
 */
export async function createFarm(farm: IFarm) {
  const { userId } = farm;

  if (!userId) {
    throw new BadRequestError("Farmer Id is required");
  }

  const existingUser = (await getUsers({ id: userId, page: 1, size: 1 }))[0];

  if (!existingUser) {
    throw new NotFoundError("farmer not found");
  }

  const userRole = await getRoleById(existingUser.roleId);

  if (userRole !== "farmer") {
    throw new BadRequestError("Only farmer can have farm");
  }

  const existingFarms = (await getAllFarms()).map((farm) => farm.farmName);

  if (existingFarms.includes(farm.farmName)) {
    throw new BadRequestError("Farm name already exists");
  }

  return await FarmModel.create(farm);
}

/**
 * Function to get farm
 * @param filter
 * @returns
 */
export async function getFarms(filter: IGetFarmQuery) {
  return await FarmModel.get(filter);
}

export async function getAllFarms() {
  return await FarmModel.getAll();
}

/**
 * Function to update farm
 * @param filter
 * @param farm
 * @returns
 */
export async function updateFarm(filter: IGetFarmQuery, farm: IFarm) {
  const { id: farmId } = filter;

  if (!farmId) {
    throw new BadRequestError("Farm Id is required");
  }

  if (!(await getFarms({ id: farmId, page: 1, size: 1 }))[0]) {
    throw new NotFoundError("Farm not found");
  }

  console.log(farm, farmId);

  const existingFarms = (await getAllFarms()).map((farm) => farm.farmName);

  console.log(existingFarms);

  if (existingFarms.includes(farm.farmName)) {
    throw new BadRequestError("Farm name already exists");
  }

  return await FarmModel.update(farmId, farm);
}

/**
 * Function to delete farm
 * @param farm
 * @returns
 */
export async function deleteFarm(farm: IGetFarmQuery) {
  const { id: farmId } = farm;

  if (!farmId) {
    throw new BadRequestError("Farm Id is required");
  }

  return await FarmModel.delete(farmId);
}
