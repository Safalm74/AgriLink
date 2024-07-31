import * as minioClientModel from "../models/minio";

export async function getUploadUrl() {
  return minioClientModel.getUploadUrl();
}

export async function getReadUrl(fileName: string) {
  try {
    return minioClientModel.getReadUrl(fileName);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteObject(fileName: string) {
  try {
    return minioClientModel.deleteObject(fileName);
  } catch (err) {
    console.log(err);
  }
}
