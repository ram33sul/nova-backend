import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Request } from "express";
dotenv.config();

const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
});

export const getSignedUrl = async ({ query }: Request) => {
  const { fileName } = query;
  if (!fileName) {
    throw {
      status: 400,
      message: "File name is required",
    };
  }
  const Bucket = process.env.AWS_S3_ASSETS_BUCKET;
  const Key = fileName;
  const signedUrl = await s3.getSignedUrlPromise("putObject", {
    Bucket,
    Key,
    Expires: 60,
  });
  return signedUrl;
};
