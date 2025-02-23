"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlValidator = void 0;
const yup_1 = __importDefault(require("yup"));
exports.urlValidator = {
    GET: {
        "/signed-url": {
            query: yup_1.default.object({
                fileName: yup_1.default.string().required(),
            }),
        },
    },
};
