import express from "express";
import * as productController from "../controllers/product";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validation";
import {
  createProductBodySchema,
  getProductQuerySchema,
  updateProductBodySchema,
  productParamSchema,
} from "../schemas/product";
import { authenticate, authorize } from "../middlewares/auth";

const router = express();

//Route to handle product operations
router.post(
  "/",
  validateReqBody(createProductBodySchema),
  authenticate,
  authorize("product:post"),
  productController.createProduct
);

//Route to handle product get operations
router.get(
  "/",
  validateReqQuery(getProductQuerySchema),
  productController.getProducts
);

//Route to handle product put operations
router.put(
  "/:id",
  validateReqParams(productParamSchema),
  validateReqBody(updateProductBodySchema),
  authenticate,
  productController.updateProduct
);

//Route to handle product delete operations
router.delete(
  "/:id",
  validateReqParams(productParamSchema),
  authenticate,
  productController.deleteProduct
);

export default router;
