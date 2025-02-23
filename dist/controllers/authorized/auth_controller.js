"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
const auth_service_1 = require("../../services/auth_service");
const router = (0, express_1.Router)();
router.post("/refresh", (0, controller_1.default)(auth_service_1.postRefresh));
const authController = router;
exports.default = authController;
