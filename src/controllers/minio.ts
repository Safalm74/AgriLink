import { Request, Response, NextFunction } from "express";
import * as minioService from "../services/minio";
import httpStatusCode from "http-status-codes";

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
    const url = await minioService.getUploadUrl();
    res.status(httpStatusCode.OK).json({ url: url });
  } catch (error) {
    next(error);
  }
}
