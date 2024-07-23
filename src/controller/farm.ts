import { NextFunction, Request, Response } from "express";
import * as farmService from "../service/farm";

export async function createFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;

    const data = await farmService.createFarm(body);
    res.json(body);
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
  } catch (error) {
    next(error);
  }
}
