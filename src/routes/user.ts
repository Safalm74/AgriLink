import express from "express";
import * as UserController from "../controllers/user";
import { aunthenticate } from "../middlewares/auth";

const router = express();

//Route to add user
router.post("/", UserController.createUser);

//Route to get user by id
router.get("/", aunthenticate, UserController.getUsers);

// //Route to update user by id
// router.put(
//   "/:id",
//   validateReqParams(userParamSchema),
//   validateReqBody(updateUserBodySchema),
//   aunthenticate,
//   authorize("user.put"),
//   updatedUser
// );

// //Route to delete user by id
router.delete("/", aunthenticate, UserController.deleteUser);

export default router;
