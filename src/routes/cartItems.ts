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

//Route to handle cartItem operations
router.post(
  "/",
  validateReqBody(createCartBodySchema),
  authenticate,
  authorize("cart:post"),
  cartItemController.createCartItem
);

router.get(
  "/",
  validateReqQuery(getCartQuerySchema),
  authenticate,
  authorize("cart:get"),
  cartItemController.getCartItems
);

router.put(
  "/:id",
  validateReqParams(cartParamSchema),
  validateReqBody(updateCartBodySchema),
  authenticate,
  authorize("cart:put"),
  cartItemController.updateCartItem
);

router.delete(
  "/:id",
  validateReqParams(cartParamSchema),
  authenticate,
  authorize("cart:delete"),
  cartItemController.deleteCartItem
);

export default router;
