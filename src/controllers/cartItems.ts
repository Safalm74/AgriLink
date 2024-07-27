import * as cartItemsService from "../services/cartItems";
import httpStatusCode from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";

export async function createCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.user);
  try {
    const { body } = req;
    const userId = req.user!.id;

    const cartItem = await cartItemsService.createCartItem({
      userId: userId,
      ...body,
    });

    res.status(httpStatusCode.CREATED).json(cartItem);
  } catch (error) {
    next(error);
  }
}

export async function getCartItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;
    const userId = req.user!.id!;

    const cartItems = await cartItemsService.getCartItems(query, userId);

    res.status(httpStatusCode.OK).json(cartItems);
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, query } = req;
    const userId = req.user!.id!;

    const cartItem = await cartItemsService.updateCartItem(query, body, userId);

    res.status(httpStatusCode.OK).json(cartItem);
  } catch (error) {
    next(error);
  }
}

export async function deleteCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;
    const userId = req.user!.id!;

    const cartItem = await cartItemsService.deleteCartItem(query, userId);

    res.status(httpStatusCode.NO_CONTENT).json(cartItem);
  } catch (error) {
    next(error);
  }
}
