"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const yup_1 = __importDefault(require("yup"));
exports.userValidator = {
    POST: {
        "/register": {
            body: yup_1.default.object({
                email: yup_1.default.string().email().required(),
                password: yup_1.default.string().required().min(6),
                adminKey: yup_1.default.string(),
            }),
        },
        "/login": {
            body: yup_1.default.object({
                email: yup_1.default.string().required().email(),
                password: yup_1.default.string().required().min(6),
            }),
        },
    },
};
