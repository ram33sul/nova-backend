"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kycValidator = void 0;
const yup_1 = __importDefault(require("yup"));
const kyc_1 = require("../../types/kyc");
const url_1 = require("../../types/url");
exports.kycValidator = {
    GET: {
        "/list": {
            query: yup_1.default.object({
                status: yup_1.default.string().oneOf(Object.keys(kyc_1.KycStatus)),
                name: yup_1.default.string(),
                sortBy: yup_1.default.string(),
                page: yup_1.default.number().min(0),
                pageSize: yup_1.default.number().max(100),
            }),
        },
    },
    POST: {
        "/": {
            body: yup_1.default.object({
                name: yup_1.default.string().required(),
                dialCode: yup_1.default.string().required(),
                mobile: yup_1.default.string().required(),
                url: yup_1.default.string().required(),
                urlType: yup_1.default.string().required().oneOf(Object.keys(url_1.UrlType)),
            }),
        },
    },
    PUT: {
        "/status": {
            body: yup_1.default.object({
                kycId: yup_1.default.string().required(),
                status: yup_1.default.string().required().oneOf(Object.keys(kyc_1.KycStatus)),
            }),
        },
    },
};
