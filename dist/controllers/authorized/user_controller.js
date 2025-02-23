"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
const user_service_1 = require("../../services/user_service");
const validator_1 = require("../../validators/validator");
const user_validator_1 = require("../../validators/authorized/user_validator");
const router = (0, express_1.Router)();
router.get("/me", (0, validator_1.validator)(user_validator_1.userValidator.GET["/me"]), (0, controller_1.default)(user_service_1.getMe));
router.post("/logout", (0, controller_1.default)(user_service_1.postLogout));
const userController = router;
exports.default = userController;
