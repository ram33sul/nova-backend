"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
const validateRole = (roles) => (req, _, _next) => {
    const role = req.headers.role;
    if (!roles.includes(role)) {
        throw {
            status: 401,
            message: "Unauthorized",
        };
    }
    _next();
};
exports.validateRole = validateRole;
