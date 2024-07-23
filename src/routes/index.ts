import express from "express";
import authRouter from "./auth";
import userRouter from "./user";
import farmRouter from "./farm";

//Creating router object
const router = express();

//Route to handle user authentication
router.use("/auth", authRouter);

//Route to handle user operations
router.use("/user", userRouter);

//Route to handle farm operations
router.use("/farm", farmRouter);

export default router;
