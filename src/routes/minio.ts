import express from "express";
import * as MinioController from "../controllers/minio";
import { aunthenticate } from "../middlewares/auth";
import { Request } from "../interfaces/auth";
import { Response } from "express";
const router = express();

//Route to handle login
router.get("/", MinioController.getUploadUrl);

export default router;
