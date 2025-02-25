"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
const aws_service_1 = require("../../services/aws_service");
const validator_1 = require("../../validators/validator");
const url_validator_1 = require("../../validators/authorized/url_validator");
const router = (0, express_1.Router)();
router.get("/signed-url", (0, validator_1.validator)(url_validator_1.urlValidator.GET["/signed-url"]), (0, controller_1.default)(aws_service_1.getSignedUrl));
const urlController = router;
exports.default = urlController;
