import express from "express";
import * as testcontroller from "../controller/test"

//Creating router object
const router = express();

//Route for home
router.post("/", testcontroller.test);

export default router;
