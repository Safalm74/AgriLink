import * as orderController from "../controllers/orders";
import express from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { validateReqBody, validateReqParams } from "../middlewares/validation";
import {
  createOrderBodySchema,
  orderParamSchema,
  updateOrderBodySchema,
} from "../schemas/orders";

const router = express();

//Route to handle order post operations
router.get(
  "/",
  authenticate,
  authorize("order:get"),
  orderController.getOrders
);

//Route to handle order get operations
router.get(
  "/farm",
  authenticate,
  authorize("order:get"),
  orderController.getOrderForFarm
);

//Route to handle order put operations
router.post(
  "/",
  validateReqBody(createOrderBodySchema),
  authenticate,
  authorize("order:post"),
  orderController.createOrder
);

//Route to handle order put operations
router.patch(
  "/:id",
  validateReqParams(orderParamSchema),
  validateReqBody(updateOrderBodySchema),
  authenticate,
  authorize("order:put"),
  orderController.updateOrderStatus
);

//Route to handle order delete operations
router.delete(
  "/:id",
  validateReqParams(orderParamSchema),
  authenticate,
  authorize("order:delete"),
  orderController.deleteOrder
);

export default router;
