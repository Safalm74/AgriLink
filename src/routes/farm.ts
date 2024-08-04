import * as farmController from "../controllers/farm";
import { authenticate, authorize } from "../middlewares/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validation";
import {
  getFarmQuerySchema,
  createFarmBodySchema,
  updateFarmBodySchema,
  farmParamSchema,
} from "../schemas/farm";
import express from "express";

const router = express();

//Route to handle farm post operations
router.post(
  "/",
  validateReqBody(createFarmBodySchema),
  authenticate,
  authorize("farm:post"),
  farmController.createFarm
);

//Route to handle farm get operations
router.get(
  "/",
  validateReqQuery(getFarmQuerySchema),
  authenticate,
  authorize("farm:get"),
  farmController.getFarms
);

//Route to handle farm get by farmer id operations
router.get(
  "/userFarms",
  authenticate,
  authorize("farm:get"),
  farmController.getFarmByUserId
);

//Route to handle farm put operations
router.put(
  "/:id",
  validateReqParams(farmParamSchema),
  validateReqBody(updateFarmBodySchema),
  authenticate,
  authorize("farm:put"),
  farmController.updateFarm
);

//Route to handle farm delete operations
router.delete(
  "/:id",
  validateReqParams(farmParamSchema),
  authenticate,
  authorize("farm:delete"),
  farmController.deleteFarm
);

export default router;
