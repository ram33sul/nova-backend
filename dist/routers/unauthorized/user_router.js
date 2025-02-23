"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/unauthorized/user_controller"));
const router = (0, express_1.Router)();
router.use("/", user_controller_1.default);
const userRouter = router;
exports.default = userRouter;
