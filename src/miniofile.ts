import * as Minio from "minio";
import config from "./config";
import fs from "fs";
import path from "path";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: +config.minio.MINIO_API_PORT,
  useSSL: false,
  accessKey: config.minio.MINIO_ROOT_USER!,
  secretKey: config.minio.MINIO_ROOT_PASSWORD!,
});

const sourcefile = "./src/knexfile.ts";

async function makeBucket() {
  const bucketName = "agrilink-product-images";
  const exists = await minioClient.bucketExists(bucketName);
  if (exists) {
    console.log("bucket exists: ", bucketName);
  } else {
    await minioClient.makeBucket(bucketName);
    console.log("bucket created: ", bucketName);
  }

  const fileContent = fs.readFileSync(sourcefile);
  const fileName = path.basename(sourcefile);
  await minioClient.putObject(bucketName, fileName + "--UUID", fileContent);

  await minioClient.getObject(bucketName, fileName + "--UUID");
}

makeBucket();

export default minioClient;
