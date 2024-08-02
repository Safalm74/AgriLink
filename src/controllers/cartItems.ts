import * as cartItemsService from "../services/cartItems";
import httpStatusCode from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";

/**
 * controllers to create cart items
 * @param req
 * @param res
 * @param next
 */
export async function createCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

/**
 * controller to get cart items
 * @param req
 * @param res
 * @param next
 */
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

/**
 * controller to update cart items
 * @param req
 * @param res
 * @param next
 */
export async function updateCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const cartItemId = req.params.id;
    const userId = req.user!.id!;

    console.log(cartItemId);

    const cartItem = await cartItemsService.updateCartItem(
      cartItemId,
      body,
      userId
    );

    res.status(httpStatusCode.OK).json(cartItem);
  } catch (error) {
    next(error);
  }
}

/**
 * controller to delete cart items
 * @param req
 * @param res
 * @param next
 */
export async function deleteCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cartItemId = req.params.id;
    const userId = req.user!.id!;

    const cartItem = await cartItemsService.deleteCartItem(cartItemId, userId);

    res.status(httpStatusCode.NO_CONTENT).json(cartItem);
  } catch (error) {
    next(error);
  }
}
