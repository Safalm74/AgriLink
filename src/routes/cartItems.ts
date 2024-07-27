import * as cartItemController from "../controllers/cartItems";
import express from "express";
import { aunthenticate } from "../middlewares/auth";

const router = express();

//Route to handle cartItem operations
router.post("/", aunthenticate, cartItemController.createCartItem);
router.get("/", aunthenticate, cartItemController.getCartItems);
router.put("/", aunthenticate, cartItemController.updateCartItem);
router.delete("/", aunthenticate, cartItemController.deleteCartItem);

export default router;
