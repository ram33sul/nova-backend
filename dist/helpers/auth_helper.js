"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthorizationToken = void 0;
const setAuthorizationToken = (res, token) => {
    res.cookie("authorization", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
        path: "/",
        sameSite: "lax",
    });
};
exports.setAuthorizationToken = setAuthorizationToken;
