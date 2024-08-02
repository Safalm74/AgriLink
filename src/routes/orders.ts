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

router.get(
  "/",
  authenticate,
  authorize("order:get"),
  orderController.getOrders
);
router.get(
  "/farm",
  authenticate,
  authorize("order:get"),
  orderController.getOrderForFarm
);
router.post(
  "/",
  validateReqBody(createOrderBodySchema),
  authenticate,
  authorize("order:post"),
  orderController.createOrder
);
router.patch(
  "/:id",
  validateReqParams(orderParamSchema),
  validateReqBody(updateOrderBodySchema),
  authenticate,
  authorize("order:put"),
  orderController.updateOrderStatus
);
router.delete(
  "/:id",
  validateReqParams(orderParamSchema),
  authenticate,
  authorize("order:delete"),
  orderController.deleteOrder
);

export default router;
