import minioClient, { bucketName } from "../miniofile";
import { v4 as uuid } from "uuid";

export function presignedPutObject(bucketName: string, fileName: string) {
  return minioClient.presignedPutObject(bucketName, fileName, 5 * 60);
}

export async function getUploadUrl() {
  const uuidName = uuid();
  const url = await minioClient.presignedPutObject(
    bucketName,
    uuidName,
    5 * 60
  );
  return { url: url, fileName: uuidName, bucketName: bucketName };
}

export async function getReadUrl(fileName: string) {
  return minioClient.presignedGetObject(bucketName, fileName, 5 * 60);
}

export async function deleteObject(fileName: string) {
  await minioClient.removeObject(bucketName, fileName);
}
