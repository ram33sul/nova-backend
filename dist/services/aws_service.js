"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.default.S3({
    signatureVersion: "v4",
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
});
const getSignedUrl = (_a) => __awaiter(void 0, [_a], void 0, function* ({ query }) {
    const { fileName } = query;
    if (!fileName) {
        throw {
            status: 400,
            message: "File name is required",
        };
    }
    const Bucket = process.env.AWS_S3_ASSETS_BUCKET;
    const Key = fileName;
    const signedUrl = yield s3.getSignedUrlPromise("putObject", {
        Bucket,
        Key,
        Expires: 60,
    });
    return signedUrl;
});
exports.getSignedUrl = getSignedUrl;
