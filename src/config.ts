import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  port: process.env.PORT,
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
    accessTokenExpiryS: 10,
    refreshTokenExpiryS: 20,
  },
  minio: {
    MINIO_HOST: process.env.MINIO_HOST || "localhost",
    MINIO_ROOT_USER: process.env.MINIO_ROOT_USER,
    MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD,
    MINIO_API_PORT: process.env.MINIO_API_PORT || 9000,
    MINIO_CONSOLE_PORT: process.env.MINIO_CONSOLE_PORT || 9001,
    MINIO_BUCKET_NAME: "agrilink-product-images",
    PUT_TIME: 300,
    GET_TIME: 300,
  },
};

export default config;
