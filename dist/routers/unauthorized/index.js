"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user_router"));
const router = (0, express_1.Router)();
router.use("/user", user_router_1.default);
const unauthorizedRouter = router;
exports.default = unauthorizedRouter;
