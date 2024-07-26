import config from "../config";
import { UnaunthicatedError } from "../error/UnauthenticatedError";
import { IUser } from "../interfaces/users";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import loggerWithNameSpace from "../utils/logger";
import { AuthModel } from "../models/auth";
import { IUserDetails, IUserToken } from "../interfaces/auth";
import { getRoleById } from "./role";
import { getFarmId } from "./farm";

const logger = loggerWithNameSpace("Auth Service");

/**
 * service function to login:
 * @param body
 * @returns new access and refresh token
 */
export async function login(body: Pick<IUser, "email" | "password">) {
  //to await bcrypt compare
  //getting existing user
  logger.info("Attempting to get user by email");

  const existingUser = (await getUserByEmail(body.email))[0];

  //checking if user exists
  if (!existingUser) {
    logger.error("requested user doesnot exist");

    throw new UnaunthicatedError("Invalid email or password");
  }
  //comparing hashed password with incomming password
  logger.info("Checking password");

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  //checking if password entered is correct
  if (!isValidPassword) {
    logger.error("password doesnot match");

    throw new UnaunthicatedError("Invalid email or password");
  }

  logger.info("creating payload");

  //creating payload to generate tokens
  const payload = {
    id: existingUser.id,
    name: existingUser.first_name + " " + existingUser.last_name,
    email: existingUser.email,
    role_id: existingUser.roleId,
  };

  //generating access token using config jwt secret
  logger.info("creating access token");

  const accessToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiryS,
  });

  //generating refresh token using config jwt secret
  logger.info("creating refresh token");
  const refreshToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.refrehTokenExpiryS,
  });

  logger.info("Successfully logged in");

  const role = await getRoleById(existingUser.roleId);

  const userDetails: IUserDetails = {
    id: existingUser.id,
    name: existingUser.firstName + " " + existingUser.lastName,
    email: existingUser.email,
    role: role,
    phone: existingUser.phone,
    address: existingUser.address,
  };

  const responsePayload: IUserToken = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    userDetails: userDetails,
  };

  if (role === "farmer") {
    responsePayload.farm = await getFarmId(existingUser.id);
  }

  //returning access and refresh token
  return responsePayload;
}
