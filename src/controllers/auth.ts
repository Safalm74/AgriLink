import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth";
import HttpStatusCode from "http-status-codes";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Auth Controller");

//Controller function to login:
/*
  Responds with access token and refresh token if credentials 
  are correct else error is responded
*/
export async function login(req: Request, res: Response, next: NextFunction) {
  logger.info("Request: login");
  try {
    const { body } = req; //extracting body from req for credential
    const data = await AuthService.login(body);

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    logger.info("cookies sent");

    res.status(HttpStatusCode.OK).json({ data });
  } catch (error) {
    next(error);
  }
}
