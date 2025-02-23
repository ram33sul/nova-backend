"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
const user_service_1 = require("../../services/user_service");
const router = (0, express_1.Router)();
router.post("/register", (0, controller_1.default)(user_service_1.postRegister));
router.post("/login", (0, controller_1.default)(user_service_1.postLogin));
const userController = router;
exports.default = userController;
