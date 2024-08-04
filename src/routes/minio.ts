import express from "express";
import * as MinioController from "../controllers/minio";

const router = express();

//Route to get upload url
router.get("/", MinioController.getUploadUrl);

export default router;
