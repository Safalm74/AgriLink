import * as orderService from "../services/orders";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import {
  ICreateOrderBody,
  IGetOrderQuery,
  IUpdateOrderStatus,
} from "../interfaces/orders";
import httpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Order Controller");

/**
 * Controller function to create orders
 * @param req
 * @param res
 * @param next
 */
export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Req: create Orders");

    const userId = req.user!.id!;
    const order = { ...req.body, customerId: userId } as ICreateOrderBody;

    const data = await orderService.createOrder(order);

    res.status(httpStatusCode.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller function to get orders
 * @param req
 * @param res
 * @param next
 */
export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Req: get Orders");

    const userId = req.user!.id!;

    const data = await orderService.getOrders(userId);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to get orders for the farm
 * @param req
 * @param res
 * @param next
 */
export async function getOrderForFarm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Req: get Orders for the farm");

    const filter = req.query as IGetOrderQuery;
    const userId = req.user!.id!;

    const data = await orderService.getOrderForFarm(filter, userId);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to update order status
 * @param req
 * @param res
 * @param next
 */
export async function updateOrderStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Req: update Order Status");

    const id = req.params.id;
    const orderStatus = req.body as IUpdateOrderStatus;

    const data = await orderService.updateOrderStatus(id, orderStatus);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to delete order
 * @param req
 * @param res
 * @param next
 */
export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Req: delete Order");

    const id = req.params.id;
    const userId = req.user!.id;

    const data = await orderService.deleteOrder(id, userId!);

    res.status(httpStatusCode.NO_CONTENT).json(data);
  } catch (error) {
    next(error);
  }
}
