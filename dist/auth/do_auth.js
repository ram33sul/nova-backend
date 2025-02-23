"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.do_auth = void 0;
const jwt_1 = require("./jwt");
const do_auth = (req, res, _next) => {
    const token = req.cookies.authorization;
    if (!token) {
        res.status(401).send("Authorization Token is missing");
        return;
    }
    const tokenPayload = (0, jwt_1.verifyJwt)(token);
    if (!(tokenPayload.userId && tokenPayload.role)) {
        res.status(401).send("Not authorized");
        return;
    }
    req.headers.userId = tokenPayload.userId;
    req.headers.role = tokenPayload.role;
    _next();
};
exports.do_auth = do_auth;
