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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRefresh = void 0;
const jwt_1 = require("../auth/jwt");
const postRefresh = (_a) => __awaiter(void 0, [_a], void 0, function* ({ headers }) {
    const userId = headers.userId;
    const role = headers.role;
    if (!userId || typeof userId !== "string") {
        throw {
            status: 401,
            message: "Not authorized",
        };
    }
    const refreshToken = (0, jwt_1.signJwt)({
        userId,
        role,
        signedAt: new Date().toISOString(),
    }, { expiresIn: "30d" });
    return { refreshToken };
});
exports.postRefresh = postRefresh;
