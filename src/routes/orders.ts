import * as orderController from "../controllers/orders";
import express from "express";
import { aunthenticate } from "../middlewares/auth";

const router = express();

router.get("/", aunthenticate, orderController.getOrders);
router.post("/", aunthenticate, orderController.createOrder);
router.patch("/", aunthenticate, orderController.updateOrder);
router.delete("/", aunthenticate, orderController.deleteOrder);

export default router;
