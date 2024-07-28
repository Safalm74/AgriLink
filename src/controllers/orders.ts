import * as orderService from "../services/orders";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import {
  ICreateOrderBody,
  IGetOrderQuery,
  IOrders,
} from "../interfaces/orders";
import httpStatusCode from "http-status-codes";

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id!;
  const data = await orderService.getOrders(userId);

  res.status(httpStatusCode.OK).json(data);
}

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id!;
  const order = { ...req.body, customerId: userId } as ICreateOrderBody;
  const data = await orderService.createOrder(order);

  res.status(httpStatusCode.CREATED).json(data);
}

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const filter = req.query as IGetOrderQuery;
  const order = req.body as IOrders;
  const data = await orderService.updateOrder(filter, order);

  res.status(httpStatusCode.OK).json(data);
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const filter = req.query as IGetOrderQuery;
  const data = await orderService.deleteOrder(filter);

  res.status(httpStatusCode.NO_CONTENT).json(data);
}
