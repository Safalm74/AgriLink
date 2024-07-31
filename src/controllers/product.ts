import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product";
import loggerWithNameSpace from "../utils/logger";
import httpStatusCode from "http-status-codes";

const logger = loggerWithNameSpace("Product Controller");

/**
 * controller function to create product
 * @param req
 * @param res
 * @param next
 */
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;

    logger.info("Req: create Product");

    await productService.createProduct(body);

    res.status(httpStatusCode.CREATED).json("create product");
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to get products
 * @param req
 * @param res
 * @param next
 */
export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;

    const data = await productService.getProducts(query);

    res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to update product
 * @param req
 * @param res
 * @param next
 */
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const productId = req.params.id;

    await productService.updateProduct(productId, body);

    res.status(httpStatusCode.OK).json("update product");
  } catch (error) {
    next(error);
  }
}

/**
 * controller function to delete product
 * @param req
 * @param res
 * @param next
 */
export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.id;

    await productService.deleteProduct(productId);

    res.status(httpStatusCode.NO_CONTENT).json("delete product");
  } catch (error) {
    next(error);
  }
}
