import { IGetProductQuery, IProduct } from "../interfaces/products";
import ProductModel from "../models/product";
import { BadRequestError } from "../error/BadRequestError";
import { getFarms } from "./farm";
import { NotFoundError } from "../error/NotFoundError";

/**
 * Function to get product
 * @param filter
 * @returns
 */
export async function getProducts(filter: IGetProductQuery) {
  const farmId = filter.farmId;

  if (farmId && !(await getFarms({ id: farmId, page: 1, size: 1 }))[0]) {
    throw new NotFoundError("Farm not found");
  }

  return ProductModel.get(filter);
}

/**
 *  Function to create product
 * @param product
 * @returns
 */
export function createProduct(product: IProduct) {
  return ProductModel.create(product);
}

/**
 * Function to update product
 * @param filter
 * @param product
 * @returns
 */
export async function updateProduct(id: IGetProductQuery, product: IProduct) {
  const { id: productId } = id;

  if (!productId) {
    throw new BadRequestError("Product Id is required");
  }

  if (!(await getProducts({ id: productId, page: 1, size: 1 }))[0]) {
    throw new NotFoundError("Product not found");
  }
  return ProductModel.update(productId, product);
}

/**
 * Function to delete product
 * @param product
 * @returns
 */
export function deleteProduct(product: IGetProductQuery) {
  const { id: productId } = product;

  if (!productId) {
    throw new BadRequestError("Product Id is required");
  }

  return ProductModel.delete(productId);
}
