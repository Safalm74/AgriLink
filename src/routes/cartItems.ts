import * as cartItemController from "../controllers/cartItems";
import express from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "uuid";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validation";
import {
  cartParamSchema,
  createCartBodySchema,
  getCartQuerySchema,
  updateCartBodySchema,
} from "../schemas/cartItems";

const router = express();

//Route to handle cartItem post operations
router.post(
  "/",
  validateReqBody(createCartBodySchema),
  authenticate,
  authorize("cart:post"),
  cartItemController.createCartItem
);

//Route to handle cartItem get operations
router.get(
  "/",
  validateReqQuery(getCartQuerySchema),
  authenticate,
  authorize("cart:get"),
  cartItemController.getCartItems
);

//Route to handle cartItem put operations
router.put(
  "/:id",
  validateReqParams(cartParamSchema),
  validateReqBody(updateCartBodySchema),
  authenticate,
  authorize("cart:put"),
  cartItemController.updateCartItem
);

//Route to handle cartItem delete operations
router.delete(
  "/:id",
  validateReqParams(cartParamSchema),
  authenticate,
  authorize("cart:delete"),
  cartItemController.deleteCartItem
);

export default router;
