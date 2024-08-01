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

//Route to handle farm operations
router.post(
  "/",
  validateReqBody(createFarmBodySchema),
  authenticate,
  authorize("farm:post"),
  farmController.createFarm
);

router.get(
  "/",
  validateReqQuery(getFarmQuerySchema),
  authenticate,
  authorize("farm:get"),
  farmController.getFarms
);

router.get(
  "/userFarms",
  authenticate,
  authorize("farm:get"),
  farmController.getFarmByUserId
);

router.put(
  "/:id",
  validateReqParams(farmParamSchema),
  validateReqBody(updateFarmBodySchema),
  authenticate,
  authorize("farm:put"),
  farmController.updateFarm
);

router.delete(
  "/:id",
  validateReqParams(farmParamSchema),
  authenticate,
  authorize("farm:delete"),
  farmController.deleteFarm
);

export default router;
