import config from "./config";
import express from "express";
import Router from "./routes/"; //index router
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/logger";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Middleware to add security level
app.use(helmet());

//Middleware to limit request for the ip address
app.use(config.rateLimit.limiter);

//Middleware to parse incoming requests with JSON payload
app.use(express.json());

//Middleware to parse cookies
app.use(cookieParser());

//Middleware to log
app.use(requestLogger);

//Middleware to enable cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//use main router
app.use(Router);

//Middleware to handle errors
app.use(genericErrorHandler);

//Middleware to handle if route requested is not found
app.use(notFoundError);

//server port,defaulting to port 8000 if not specified
const serverPort = config.port ? config.port : 8000;

//listening on server port
app.listen(serverPort, () => {
  console.log(`Listening in port ${serverPort} `);
});
