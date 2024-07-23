import * as farmController from "../controllers/farm";
import { aunthenticate } from "../middlewares/auth";
import { validateReqBody, validateReqQuery } from "../middlewares/validation";
import {
  getFarmQuerySchema,
  createFarmBodySchema,
  updateFarmBodySchema,
  updateFarmQuerySchema,
  deleteFarmQuerySchema,
} from "../schemas/farm";
import express from "express";

const router = express();

//Route to handle farm operations
router.post(
  "/",
  validateReqBody(createFarmBodySchema),
  aunthenticate,
  farmController.createFarm
);

router.get(
  "/",
  validateReqQuery(getFarmQuerySchema),
  aunthenticate,
  farmController.getFarms
);

router.put(
  "/",
  validateReqQuery(updateFarmQuerySchema),
  validateReqBody(updateFarmBodySchema),
  aunthenticate,
  farmController.updateFarm
);

router.delete(
  "/",
  validateReqQuery(deleteFarmQuerySchema),
  aunthenticate,
  farmController.deleteFarm
);

export default router;
