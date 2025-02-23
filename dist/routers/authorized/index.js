"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth_router"));
const kyc_router_1 = __importDefault(require("./kyc_router"));
const url_router_1 = __importDefault(require("./url_router"));
const user_router_1 = __importDefault(require("./user_router"));
const router = (0, express_1.Router)();
router.use("/auth", auth_router_1.default);
router.use("/kyc", kyc_router_1.default);
router.use("/url", url_router_1.default);
router.use("/user", user_router_1.default);
const authorizedRouter = router;
exports.default = authorizedRouter;
