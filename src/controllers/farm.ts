import { NextFunction, Request, Response } from "express";
import * as farmService from "../services/farm";
import loggerWithNameSpace from "../utils/logger";
import httpStatusCode from "http-status-codes";

const logger = loggerWithNameSpace("Farm Controller");

export async function createFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;

    logger.info("Request: createFarm");

    const data = await farmService.createFarm(body);
    res.status(httpStatusCode.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getFarms(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;
    const data = await farmService.getFarms(query);
    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, query } = req;
    const data = await farmService.updateFarm(query, body);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function deleteFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query;
    const data = await farmService.deleteFarm(query);

    res.status(httpStatusCode.NO_CONTENT).json(data);
  } catch (error) {
    next(error);
  }
}
