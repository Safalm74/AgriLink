import express from "express";
import * as MinioController from "../controllers/minio";

const router = express();

//Route to handle login
router.get("/", MinioController.getUploadUrl);

export default router;
