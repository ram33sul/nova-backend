"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kyc_controller_1 = __importDefault(require("../../controllers/authorized/kyc_controller"));
const router = (0, express_1.Router)();
router.use("/", kyc_controller_1.default);
const kycRouter = router;
exports.default = kycRouter;
