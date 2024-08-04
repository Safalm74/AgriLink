import { NotFoundError } from "../error/NotFoundError";
import {
  ICreateCartItemBody,
  IGetCartItemQuery,
} from "../interfaces/cartItems";
import CartItemModel from "../models/cartItems";
import ProductModel from "../models/product";

/**
 *
 * @param filter
 * @param userId
 * @returns
 */
export async function getCartItems(filter: IGetCartItemQuery, userId: string) {
  const data = await CartItemModel.get(filter, userId);
  return data;
}

/**
 *
 * @param cartItem
 */
export async function createCartItem(cartItem: ICreateCartItemBody) {
  const { productId, userId } = cartItem;

  console.log("in createCartItem cartItem:", cartItem);

  const maxPossibleProductQuantity = +(
    await ProductModel.get({ id: productId })
  )[0].quantity;

  if (!userId || !productId) {
    throw new NotFoundError("User Id and Product Id is required");
  }

  const existingCartId = (await CartItemModel.getCartIdByProductId(
    productId,
    userId!
  ))![0];

  console.log("existingCartId", existingCartId, userId);
  if (existingCartId) {
    const existingQuantity: number = +existingCartId.quantity;

    if (cartItem.quantity + existingQuantity < maxPossibleProductQuantity) {
      cartItem.quantity = +cartItem.quantity + existingQuantity;
    } else {
      cartItem.quantity = maxPossibleProductQuantity;
    }

    console.log("reached here");

    return CartItemModel.update(existingCartId!.id, cartItem, userId!);
  } else {
    if (cartItem.quantity > maxPossibleProductQuantity) {
      cartItem.quantity = maxPossibleProductQuantity;
    }

    return await CartItemModel.create(cartItem);
  }
}

/**
 *
 * @param filter
 * @param cartItem
 * @param userId
 * @returns
 */
export async function updateCartItem(
  cartItemId: string,
  cartItem: ICreateCartItemBody,
  userId: string
) {
  if (!cartItemId) {
    throw new Error("Product Id is required");
  }

  const data = await CartItemModel.update(cartItemId, cartItem, userId);

  return data;
}

/**
 *
 * @param filter
 * @param userId
 * @returns
 */
export async function deleteCartItem(cartItemId: string, userId: string) {
  if (!cartItemId) {
    throw new NotFoundError("Product Id is required");
  }

  if (!(await getCartItems({ id: cartItemId }, userId))) {
    throw new NotFoundError("Product not found");
  }

  const data = await CartItemModel.delete(userId, cartItemId);

  return data;
}

/**
 *
 * @param userId
 * @returns
 */
export async function emptyCart(userId: string) {
  return await CartItemModel.delete(userId);
}
