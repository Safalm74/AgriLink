import { NextFunction, Response } from "express";
import * as farmService from "../services/farm";
import loggerWithNameSpace from "../utils/logger";
import httpStatusCode from "http-status-codes";
import { Request } from "../interfaces/auth";

const logger = loggerWithNameSpace("Farm Controller");

/**
 * controller function to create new farm
 * @param req
 * @param res
 * @param next
 */
export async function createFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Request: createFarm");

    const { body } = req;
    const userId = req.user!.id;

    const data = await farmService.createFarm(body, userId!);
    res.status(httpStatusCode.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to get farms
 * @param req
 * @param res
 * @param next
 */
export async function getFarms(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Request: getFarms");

    const { query } = req;

    const data = await farmService.getFarms(query);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getFarmByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Request: getFarmByUserId");

    const userId = req.user!.id;

    const data = await farmService.getFarmByUserId(userId!);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to update farm
 * @param req
 * @param res
 * @param next
 */
export async function updateFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Request: updateFarm");

    const { body, params } = req;
    const userId = req.user!.id;

    const data = await farmService.updateFarm(params.id!, body, userId!);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to delete farm
 * @param req
 * @param res
 * @param next
 */
export async function deleteFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Request: deleteFarm");

    const id = req.params.id;
    const userId = req.user!.id;
    const role = req.user!.roleId;

    const data = await farmService.deleteFarm(id, userId!, role!);

    res.status(httpStatusCode.NO_CONTENT).json(data);
  } catch (error) {
    next(error);
  }
}
