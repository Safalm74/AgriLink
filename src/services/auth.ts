import config from "../config";
import { UnauthicatedError } from "../error/UnauthenticatedError";
import { IUser } from "../interfaces/users";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import loggerWithNameSpace from "../utils/logger";
import { ITokenPlayload, IUserDetails, IUserToken } from "../interfaces/auth";
import { getRoleById } from "./role";
import { getFarmByUserId } from "./farm";

const logger = loggerWithNameSpace("Auth Service");

/**
 * service function to login:
 * @param body
 * @returns user details, new access and refresh token
 */
export async function login(body: Pick<IUser, "email" | "password">) {
  //to await bcrypt compare
  //getting existing user
  logger.info("Attempting to get user by email");

  const existingUser = (await getUserByEmail(body.email))[0];

  //checking if user exists
  if (!existingUser) {
    logger.error("requested user does not exist");

    throw new UnauthicatedError("Invalid email or password");
  }
  //comparing hashed password with incoming password
  logger.info("Checking password");

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  //checking if password entered is correct
  if (!isValidPassword) {
    logger.error("password does not match");

    throw new UnauthicatedError("Invalid email or password");
  }

  logger.info("creating payload");

  //creating payload to generate tokens
  const payload: ITokenPlayload = {
    id: existingUser.id,
    name: existingUser.first_name + " " + existingUser.last_name,
    email: existingUser.email,
    roleId: existingUser.roleId,
  };

  //generating access token using config jwt secret
  logger.info("creating access token");

  const accessToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiryS,
  });

  //generating refresh token using config jwt secret
  logger.info("creating refresh token");

  const refreshToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.refreshTokenExpiryS,
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
    responsePayload.farm = await getFarmByUserId(existingUser.id);
  }

  //returning access and refresh token
  return responsePayload;
}

/**
 * Service function to generate new access token from valid refresh token
 * @param RefreshToken
 * @returns new access token
 */
export async function refreshAccessToken(RefreshToken: string) {
  const token = RefreshToken.split(" ");

  /*
    the incoming token must have format of:
      "Bearer <token>"
    to ensure this, 
    refresh token is splitted by (" ")
    then checked if token[0]==="Bearer"
    and splitted token is of length 2
  */
  if (token?.length !== 2 || token[0] !== "Bearer") {
    logger.error(`token format mismatch: ${token}`);

    throw new UnauthicatedError("Un-Authenticated");
  }

  logger.info(`Verifying refresh token`);
  //JWT verify verifies the token and returns decoded token  if verified
  const existingUserPayload = verify(
    token[1],
    config.jwt.jwt_secret!
  ) as ITokenPlayload;

  //creating payload to generate new access token
  logger.info("creating payload");

  //creating payload to generate tokens
  const payload: ITokenPlayload = {
    id: existingUserPayload.id,
    name: existingUserPayload.name,
    email: existingUserPayload.email,
    roleId: existingUserPayload.roleId,
  };

  //generating access token using config jwt secret
  logger.info("creating access token");

  const accessToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiryS,
  });

  //returning access token
  return { accessToken: accessToken };
}
