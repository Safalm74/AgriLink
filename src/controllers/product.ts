import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product";
import loggerWithNameSpace from "../utils/logger";
import httpStatusCode from "http-status-codes";

const logger = loggerWithNameSpace("Product Controller");

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

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, query } = req;

    await productService.updateProduct(query, body);

    res.status(httpStatusCode.OK).json("update product");
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query;

    await productService.deleteProduct(query);

    res.status(httpStatusCode.NO_CONTENT).json("delete product");
  } catch (error) {
    next(error);
  }
}
