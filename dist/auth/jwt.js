"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (payload, options) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw {
            status: 500,
            message: "JWT Secret key is not configured!",
        };
    }
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw {
            status: 500,
            message: "JWT Secret key is not configured!",
        };
    }
    return jsonwebtoken_1.default.verify(token, secretKey);
};
exports.verifyJwt = verifyJwt;
