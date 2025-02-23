"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoles = void 0;
const Role_1 = __importDefault(require("../models/Role"));
const role_1 = require("../types/role");
const defaultRoles = Object.keys(role_1.RoleName);
const initializeRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRoles = yield Role_1.default.find({ name: { $in: defaultRoles } });
        const existingRoleNames = existingRoles.map((role) => role.name);
        const missingRoles = defaultRoles.filter((role) => !existingRoleNames.includes(role));
        if (missingRoles.length > 0) {
            yield Role_1.default.insertMany(missingRoles.map((name) => ({ name })));
            console.log("Roles populated successfully:", missingRoles);
        }
        else {
            console.log("All default roles already exist. No action taken.");
        }
    }
    catch (error) {
        console.error("Error populating roles:", error);
    }
});
exports.initializeRoles = initializeRoles;
