import { NotFoundError } from "../error/NotFoundError";
import {
  ICreateCartItemBody,
  IGetCartItemQuery,
} from "../interfaces/cartItems";
import CartItemModel from "../models/cartItems";
import ProductModel from "../models/product";

export async function getCartItems(filter: IGetCartItemQuery, userId: string) {
  const data = await CartItemModel.get(filter, userId);
  return data;
}
export async function createCartItem(cartItem: ICreateCartItemBody) {
  const { productId, userId } = cartItem;
  const maxPossibleProductQuantity = +(
    await ProductModel.get({ id: productId })
  )[0].quantity;

  if (!userId || !productId) {
    throw new Error("User Id is required");
  }
  const existingCartId = (await CartItemModel.getCartIdByProductId(
    productId,
    userId!
  ))![0];

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

export async function updateCartItem(
  filter: IGetCartItemQuery,
  cartItem: ICreateCartItemBody,
  userId: string
) {
  const { id } = filter;
  if (!id) {
    throw new Error("Product Id is required");
  }
  const data = await CartItemModel.update(id, cartItem, userId);
  return data;
}

export async function deleteCartItem(
  filter: IGetCartItemQuery,
  userId: string
) {
  const { id } = filter;

  if (!id) {
    throw new NotFoundError("Product Id is required");
  }

  if (!(await getCartItems({ id: id }, userId))) {
    throw new NotFoundError("Product not found");
  }

  const data = await CartItemModel.delete(userId, id);

  return data;
}

export async function emptyCart(userId: string) {
  const data = await CartItemModel.delete(userId);
  return data;
}
