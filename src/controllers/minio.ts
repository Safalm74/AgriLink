import { Request, Response, NextFunction } from "express";
import * as minioService from "../services/minio";
import httpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Product Controller");

/**
 * controller function to get upload url
 * @param req
 * @param res
 * @param next
 */
export async function getUploadUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Request: getUploadUrl");

    const url = await minioService.getUploadUrl();

    res.status(httpStatusCode.OK).json({ url: url });
  } catch (error) {
    next(error);
  }
}
