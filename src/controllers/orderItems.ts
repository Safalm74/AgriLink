import { Request, Response, NextFunction } from "express";
import { IGetOrderItemsQuery } from "../interfaces/orderItems";
import * as orderItemService from "../services/orderItems";
import httpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("OrderItem Controller");

/**
 * controller function to get order items
 * @param req
 * @param res
 * @param next
 */
export async function getOrderItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Req: get order items");

    const filter = req.query as IGetOrderItemsQuery;

    const data = await orderItemService.getOrderItem(filter);

    console.log(filter);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}
