import { IGetProductQuery, IProduct } from "../interfaces/products";
import ProductModel from "../models/product";
import { BadRequestError } from "../error/BadRequestError";
import { getFarms } from "./farm";
import { NotFoundError } from "../error/NotFoundError";
import { deleteObject, getReadUrl } from "./minio";

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
  const data = await ProductModel.get(filter);

  const newData = await Promise.all(
    data.map(async (product) => {
      product.imageUrl = await getReadUrl(product.imageUrl);
      return product;
    })
  );

  return newData;
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
export async function updateProduct(productId: string, product: IProduct) {
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
export async function deleteProduct(productId: string) {
  if (!productId) {
    throw new BadRequestError("Product Id is required");
  }

  const deletingProduct = (
    await ProductModel.get({ id: productId, page: 1, size: 1 })
  )[0];

  if (!deletingProduct) {
    throw new NotFoundError("Product not found");
  }

  await deleteObject(deletingProduct.imageUrl);

  return ProductModel.delete(productId);
}
