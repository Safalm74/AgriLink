import { JsonWebTokenError, verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import config from "../config";
import { UnauthicatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "../interfaces/users";
import { JWTExpiredError } from "../error/JWTExpiredError";
import { JWTMalformed } from "../error/JWTMalformed";
import { JWTInvalidSignatureError } from "../error/JWTInvalidSignatureError";
import { getPermissionForRole } from "../services/rolesAndPermissions";

const logger = loggerWithNameSpace("Auth Middleware");

/**
 * middleware function to Authenticate
 * @param req
 * @param res
 * @param next
 * @returns
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  logger.info("Authenticating user by email");

  //extracting authorization from request header
  const { authorization } = req.headers;

  logger.info("Checking if token exists");
  //checking if token is provided in authorization
  if (!authorization) {
    logger.error("No token provided");
    next(new UnauthicatedError("Un-Authenticated"));
  }

  /*
    the incoming token must have format of:
      "Bearer <token>"
    to ensure this, 
    refresh token is splitted by (" ")
    then checked if token[0]==="Bearer"
    and splitted token is of length 2
  */
  const token = authorization?.split(" ");

  if (token?.length !== 2 || token[0] !== "Bearer") {
    logger.error("Invalid token");
    next(new UnauthicatedError("Un-Authenticated"));

    return;
  }
  logger.info("verifying token");
  try {
    //JWT verify verifies the token and returns decoded token if verified
    const user = verify(token[1], config.jwt.jwt_secret!) as Omit<
      IUser,
      "password"
    >;

    logger.info("Verified token");

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.message === "invalid signature") {
        logger.error("Invalid Signature");
        next(new JWTInvalidSignatureError("Un-Authenticated"));
      }

      if (error.message === "jwt malformed") {
        logger.error("Invalid token");
        next(new JWTMalformed("Un-Authenticated"));
      }

      if (error.message === "jwt expired") {
        logger.error("Token Expired");
        next(new JWTExpiredError("Token Expired"));
      }
    } else {
      next(error);
    }
  }
}

/**
 * middleware function to Authorize
 * @param permission
 * @returns
 */
export function authorize(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    const permissions = (await getPermissionForRole(`${user.roleId}`)).map(
      ({ permissions }) => permissions
    );

    logger.info(`Checking permissions for user: ${user.id}`);

    //checking if permission required includes for user
    if (!permissions.includes(permission)) {
      logger.error("Permission not granted");

      next(new ForbiddenError("Forbidden"));

      return;
    }
    logger.info("Authorized");

    next();
  };
}
