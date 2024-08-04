import { IGetProductQuery, IProduct } from "../interfaces/products";
import ProductModel from "../models/product";
import { BadRequestError } from "../error/BadRequestError";
import { getFarms } from "./farm";
import { NotFoundError } from "../error/NotFoundError";
import { deleteObject, getReadUrl } from "./minio";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Products service");

/**
 *  Function to create product
 * @param product
 */
export function createProduct(product: IProduct) {
  return ProductModel.create(product);
}

/**
 * Function to get product
 * @param filter
 * @returns product details
 */
export async function getProducts(filter: IGetProductQuery) {
  const farmId = filter.farmId;

  logger.info(
    "checking if farmid is provided and if provided product for farm"
  );

  if (farmId && !(await getFarms({ id: farmId, page: 1, size: 1 }))[0]) {
    throw new NotFoundError("Farm not found");
  }

  logger.info("getting product from db");

  const data = await ProductModel.get(filter);

  logger.info("wrapping product with image url");

  const newData = await Promise.all(
    data.map(async (product) => {
      product.imageUrl = await getReadUrl(product.imageUrl);
      return product;
    })
  );

  return newData;
}

/**
 * Function to update product
 * @param filter
 * @param product
 */
export async function updateProduct(productId: string, product: IProduct) {
  if (!productId) {
    throw new BadRequestError("Product Id is required");
  }

  logger.info("checking if product exists");

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

  logger.info("checking if product exists");

  if (!deletingProduct) {
    throw new NotFoundError("Product not found");
  }

  logger.info("deleting product image from MinIO");

  await deleteObject(deletingProduct.imageUrl);

  return ProductModel.delete(productId);
}
