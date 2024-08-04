import minioClient, { bucketName } from "../miniofile";
import { v4 as uuid } from "uuid";
import config from "../config";

export async function getUploadUrl() {
  const uuidName = uuid();
  const url = await minioClient.presignedPutObject(
    bucketName,
    uuidName,
    config.minio.PUT_TIME
  );

  return { url: url, fileName: uuidName, bucketName: bucketName };
}

export async function getReadUrl(fileName: string) {
  return minioClient.presignedGetObject(
    bucketName,
    fileName,
    config.minio.GET_TIME
  );
}

export async function deleteObject(fileName: string) {
  await minioClient.removeObject(bucketName, fileName);
}
