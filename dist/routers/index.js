"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unauthorized_1 = __importDefault(require("./unauthorized"));
const do_auth_1 = require("../auth/do_auth");
const authorized_1 = __importDefault(require("./authorized"));
const router = (0, express_1.Router)();
router.use("/authorized", do_auth_1.do_auth, authorized_1.default);
router.use("/unauthorized", unauthorized_1.default);
exports.default = router;
