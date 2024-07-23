import * as farmController from "../controller/farm";
import express from "express";

const router = express();

//Route to handle farm operations
router.post("/", farmController.createFarm);

router.get("/", farmController.getFarms);

router.put("/", farmController.updateFarm);

router.delete("/", farmController.deleteFarm);

export default router;
