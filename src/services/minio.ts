import * as minioClientModel from "../models/minio";

/**
 * function to get minio upload url
 * @returns minio upload url
 */
export async function getUploadUrl() {
  return minioClientModel.getUploadUrl();
}

/**
 * function to get minio read url
 * @param fileName
 * @returns minio read url
 */
export async function getReadUrl(fileName: string) {
  return minioClientModel.getReadUrl(fileName);
}

/**
 * function to delete object
 * @param fileName
 */
export async function deleteObject(fileName: string) {
  return minioClientModel.deleteObject(fileName);
}
