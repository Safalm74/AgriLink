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
  //authorize("orders:get"),
  orderController.getOrders
);
router.get(
  "/farm",
  authenticate,
  //authorize("orders:get"),
  orderController.getOrderForFarm
);
router.post(
  "/",
  validateReqBody(createOrderBodySchema),
  authenticate,
  //authorize("orders:post"),
  orderController.createOrder
);
router.patch(
  "/:id",
  validateReqParams(orderParamSchema),
  validateReqBody(updateOrderBodySchema),
  authenticate,
  // authorize("orders:put"),
  orderController.updateOrderStatus
);
router.delete(
  "/:id",
  validateReqParams(orderParamSchema),
  authenticate,
  //authorize("orders:delete"),
  orderController.deleteOrder
);

export default router;
