import minioClient, { bucketName } from "../miniofile";
import { v4 as uuid } from "uuid";

export async function makeBucket() {
  const bucketName = "agrilink-product-images";
  const exists = await minioClient.bucketExists(bucketName);
  if (exists) {
    console.log("bucket exists: ", bucketName);
  } else {
    minioClient.makeBucket(bucketName);
    console.log("bucket created: ", bucketName);
  }
}

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

export async function getRealUrl(fileName: string) {
  try {
    return minioClient.presignedGetObject(bucketName, fileName, 5 * 60);
  } catch (err) {
    console.log(err);
  }
}
