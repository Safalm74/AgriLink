import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  port: process.env.PORT || 8000,
  database: {
    DB_CLIENT: process.env.DB_CLIENT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PW: process.env.DB_PW,
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    accessTokenExpiryS: "1D",
    refreshTokenExpiryS: "30D",
  },
  minio: {
    MINIO_HOST: process.env.MINIO_HOST || "localhost",
    MINIO_ROOT_USER: process.env.MINIO_ROOT_USER,
    MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD,
    MINIO_API_PORT: process.env.MINIO_API_PORT || 9000,
    MINIO_CONSOLE_PORT: process.env.MINIO_CONSOLE_PORT || 9001,
    MINIO_BUCKET_NAME: "agrilink-product-images",
    PUT_TIME: 300,
    GET_TIME: 10000,
  },
  rateLimit: {
    limiter: rateLimit({
      windowMs: 60 * 1000,
      max: 1000,
      message: "Too many requests",
    }),
  },
};

export default config;
