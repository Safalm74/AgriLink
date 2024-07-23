import express from "express";
import * as productController from "../controllers/product";
import { validateReqBody, validateReqQuery } from "../middlewares/validation";
import {
  createProductBodySchema,
  getProductQuerySchema,
  updateProductQuerySchema,
  updateProductBodySchema,
  deleteProductQuerySchema,
} from "../schemas/product";
import { aunthenticate } from "../middlewares/auth";

const router = express();

//Route to handle product operations
router.post(
  "/",
  validateReqBody(createProductBodySchema),
  aunthenticate,
  productController.createProduct
);

router.get(
  "/",
  validateReqQuery(getProductQuerySchema),
  productController.getProducts
);

router.put(
  "/",
  validateReqQuery(updateProductQuerySchema),
  validateReqBody(updateProductBodySchema),
  aunthenticate,
  productController.updateProduct
);

router.delete(
  "/",
  validateReqQuery(deleteProductQuerySchema),
  aunthenticate,
  productController.deleteProduct
);

export default router;
