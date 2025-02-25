"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
const kyc_service_1 = require("../../services/kyc_service");
const validate_role_1 = require("../../auth/validate_role");
const role_1 = require("../../types/role");
const validator_1 = require("../../validators/validator");
const kyc_validator_1 = require("../../validators/authorized/kyc_validator");
const router = (0, express_1.Router)();
router.post("/", (0, validator_1.validator)(kyc_validator_1.kycValidator.POST["/"]), (0, controller_1.default)(kyc_service_1.postKyc));
router.put("/status", (0, validate_role_1.validateRole)([role_1.RoleName.ADMIN]), (0, validator_1.validator)(kyc_validator_1.kycValidator.PUT["/status"]), (0, controller_1.default)(kyc_service_1.putKycStatus));
router.get("/list", (0, validate_role_1.validateRole)([role_1.RoleName.ADMIN]), (0, validator_1.validator)(kyc_validator_1.kycValidator.GET["/list"]), (0, controller_1.default)(kyc_service_1.getKycList));
router.get("/user", (0, controller_1.default)(kyc_service_1.getKycUser));
router.get("/report", (0, validate_role_1.validateRole)([role_1.RoleName.ADMIN]), (0, controller_1.default)(kyc_service_1.getKycReport));
const kycController = router;
exports.default = kycController;
