import { Response, NextFunction } from "express";
import * as UserService from "../services/user";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { Request } from "../interfaces/auth";
import { IGetUserQuery } from "../interfaces/users";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("User Controller");

//controller function to create user:
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Add user");
  try {
    const { body } = req; //getting new user data from request body

    console.log("in user controller", body);

    const req_user = await UserService.createUser(body, req.user!.id);

    console.log("body", body);

    res.status(HttpStatusCode.CREATED).json(req_user);
  } catch (error) {
    next(error);
  }
}

// //controller function to get user by id:
// export async function getUserById(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const id = `${req.params.id}`; //getting id from request params

//     const data = await UserService.getUserById(id);

//     res.status(HttpStatusCode.OK).json(data);
//   } catch (error) {
//     next(error);
//   }
// }

//controller functon to get multiple users:
export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { query } = req;
  const data = await UserService.getUsers(query);
  res.json(data);
}

// //controller function to update user
// export async function updatedUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   logger.info("Request: Update user");

//   try {
//     const id = `${req.params.id}`;
//     const { body } = req;
//     const msg = await UserService.updateUser(id, body);

//     res.status(HttpStatusCode.OK).json({
//       msg: msg,
//     });
//   } catch (error) {
//     console.log(error);

//     next(error);
//   }
// }

// //controller function to delete user
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Request: Delete user");

  try {
    const query: Pick<IGetUserQuery, "id"> = req.query;

    if (!query.id) {
      throw new BadRequestError("id is required");
    }

    const msg = await UserService.deleteUser(query.id!);

    res.status(HttpStatusCode.NO_CONTENT).json({
      msg: msg,
    });
  } catch (error) {
    next(error);
  }
}
