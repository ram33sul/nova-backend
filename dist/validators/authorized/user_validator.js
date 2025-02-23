"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const yup_1 = __importDefault(require("yup"));
const role_1 = require("../../types/role");
exports.userValidator = {
    GET: {
        "/me": {
            query: yup_1.default.object({
                role: yup_1.default.string().optional().oneOf(Object.keys(role_1.RoleName)),
            }),
        },
    },
};
