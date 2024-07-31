import express from "express";
import { authenticate, authorize } from "../middlewares/auth";
import * as orderItemController from "../controllers/orderItems";
import { validateReqQuery } from "../middlewares/validation";
import { getOrderQuerySchema } from "../schemas/orders";

const router = express.Router();

//route to get order items
router.get(
  "/",
  validateReqQuery(getOrderQuerySchema),
  authenticate,
  authorize("orderItems:get"),
  orderItemController.getOrderItems
);

export default router;
