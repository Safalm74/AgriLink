import { Request, Response, NextFunction } from "express";
import { IGetOrderItemsQuery } from "../interfaces/orderItems";
import * as orderItemService from "../services/orderItems";
import httpStatusCode from "http-status-codes";

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
    const filter = req.query as IGetOrderItemsQuery;

    const data = await orderItemService.getOrderItem(filter);

    console.log(filter);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}
