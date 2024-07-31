import { Response, NextFunction } from "express";
import * as UserService from "../services/user";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { Request } from "../interfaces/auth";

const logger = loggerWithNameSpace("User Controller");

/**
 * controller function to create new user
 * @param req
 * @param res
 * @param next
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Add user");
  try {
    const { body } = req; //getting new user data from request body

    const req_user = await UserService.createUser(body);

    res.status(HttpStatusCode.CREATED).json(req_user);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to get users:
 * @param req
 * @param res
 * @param next
 */
export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { query } = req;

  const data = await UserService.getUsers(query);

  res.json(data);
}

/**
 * controller function to update user
 * @param req
 * @param res
 * @param next
 */
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Update user");

  try {
    const id = `${req.params.id}`;
    const { body } = req;
    const msg = await UserService.updateUser(id, body);

    res.status(HttpStatusCode.OK).json({
      msg: msg,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to change customer to farmer
 * @param req
 * @param res
 * @param next
 */
export async function changeCustomerToFarmer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Change customer to farmer");

  try {
    const { body, user } = req;

    const msg = await UserService.changeCustomerToFarmer(user!.id!, body);

    res.status(HttpStatusCode.OK).json({
      msg: "Customer changed to farmer",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to delete user
 * @param req
 * @param res
 * @param next
 */
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Delete user");

  try {
    const id = `${req.params.id}`;

    const msg = await UserService.deleteUser(id);

    res.status(HttpStatusCode.NO_CONTENT).json({
      msg: msg,
    });
  } catch (error) {
    next(error);
  }
}
