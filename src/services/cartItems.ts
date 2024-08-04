import { NotFoundError } from "../error/NotFoundError";
import {
  ICreateCartItemBody,
  IGetCartItemQuery,
} from "../interfaces/cartItems";
import CartItemModel from "../models/cartItems";
import ProductModel from "../models/product";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Cart item service");

/**
 * get cart items
 * @param filter
 * @param userId
 * @returns cart items
 */
export async function getCartItems(filter: IGetCartItemQuery, userId: string) {
  const data = await CartItemModel.get(filter, userId);
  return data;
}

/**
 * create cart items
 * @param cartItem
 */
export async function createCartItem(cartItem: ICreateCartItemBody) {
  const { productId, userId } = cartItem;

  logger.info("checking max possible product quantity");

  const maxPossibleProductQuantity = +(
    await ProductModel.get({ id: productId })
  )[0].quantity;

  if (!userId || !productId) {
    throw new NotFoundError("User Id and Product Id is required");
  }

  logger.info("getting cart item exists with same product");
  const existingCartId = (await CartItemModel.getCartIdByProductId(
    productId,
    userId!
  ))![0];

  logger.info("checking max possible product quantity");
  if (existingCartId) {
    const existingQuantity: number = +existingCartId.quantity;

    if (cartItem.quantity + existingQuantity < maxPossibleProductQuantity) {
      cartItem.quantity = +cartItem.quantity + existingQuantity;
    } else {
      cartItem.quantity = maxPossibleProductQuantity;
    }

    return CartItemModel.update(existingCartId!.id, cartItem, userId!);
  } else {
    if (cartItem.quantity > maxPossibleProductQuantity) {
      cartItem.quantity = maxPossibleProductQuantity;
    }

    return await CartItemModel.create(cartItem);
  }
}

/**
 * update cart item
 * @param filter
 * @param cartItem
 * @param userId
 * @returns cart item
 */
export async function updateCartItem(
  cartItemId: string,
  cartItem: ICreateCartItemBody,
  userId: string
) {
  logger.info("checking cartItem id exists");

  if (!cartItemId) {
    throw new Error("cartItem Id is required");
  }

  logger.info("checking product exists");

  if (!(await getCartItems({ id: cartItemId }, userId))) {
    throw new NotFoundError("cartItem not found");
  }

  const data = await CartItemModel.update(cartItemId, cartItem, userId);

  return data;
}

/**
 * delete cart item
 * @param filter
 * @param userId
 */
export async function deleteCartItem(cartItemId: string, userId: string) {
  logger.info("checking cartItem id exists");
  if (!cartItemId) {
    throw new NotFoundError("cartItem Id is required");
  }

  logger.info("checking cartItem exists");
  if (!(await getCartItems({ id: cartItemId }, userId))) {
    throw new NotFoundError("Product not found");
  }

  const data = await CartItemModel.delete(userId, cartItemId);

  return data;
}

/**
 *
 * @param userId
 */
export async function emptyCart(userId: string) {
  return await CartItemModel.delete(userId);
}
