import express from "express";
import * as UserController from "../controllers/user";
import { authenticate, authorize } from "../middlewares/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validation";
import {
  createUserBodySchema,
  getUserQuerySchema,
  updateUserBodySchema,
  userParamSchema,
} from "../schemas/user";

const router = express();

//Route to add user
router.post(
  "/",
  validateReqBody(createUserBodySchema),
  UserController.createUser
);

//Route to get user by id
router.get(
  "/",
  validateReqQuery(getUserQuerySchema),
  authenticate,
  authorize("user:get"),
  UserController.getUsers
);

// //Route to update user by id
router.put(
  "/:id",
  validateReqParams(userParamSchema),
  validateReqBody(updateUserBodySchema),
  authenticate,
  authorize("user:put"),
  UserController.updateUser
);

// Route to change customer to farmer
router.patch(
  "/roleToFarmer",
  authenticate,
  authorize("user:put"),
  UserController.changeCustomerToFarmer
);

// //Route to delete user by id
router.delete(
  "/:id",
  validateReqParams(userParamSchema),
  authenticate,
  authorize("user:delete"),
  UserController.deleteUser
);

export default router;
