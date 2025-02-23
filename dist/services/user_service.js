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
exports.getMe = exports.postLogout = exports.postLogin = exports.postRegister = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_helper_1 = require("../helpers/user_helper");
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../auth/jwt");
const Role_1 = __importDefault(require("../models/Role"));
const role_1 = require("../types/role");
const object_id_1 = require("../utils/object_id");
const auth_helper_1 = require("../helpers/auth_helper");
const postRegister = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    const { email, password, adminKey } = body;
    const existingUser = yield (0, user_helper_1.getUserByEmail)(email);
    if (existingUser) {
        throw {
            status: 400,
            message: "User already exist",
        };
    }
    const isAdmin = adminKey === process.env.ADMIN_SECRET_KEY;
    const role = yield Role_1.default.findOne({
        isActive: true,
        name: isAdmin ? role_1.RoleName.ADMIN : role_1.RoleName.USER,
    });
    if (!role) {
        throw {
            status: 400,
            message: "Role not found",
        };
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = {
        roleId: role._id,
        email,
        password: hashedPassword,
    };
    const createdUser = yield User_1.default.create(newUser);
    const user = yield (0, user_helper_1.getUserByEmail)(email);
    const jwtPayload = {
        userId: createdUser._id.toString(),
        role: role.name,
        signedAt: new Date().toISOString(),
    };
    const accessToken = (0, jwt_1.signJwt)(jwtPayload, { expiresIn: "1h" });
    const refreshToken = (0, jwt_1.signJwt)(jwtPayload, { expiresIn: "30d" });
    (0, auth_helper_1.setAuthorizationToken)(res, accessToken);
    return {
        user,
        tokens: {
            accessToken,
            refreshToken,
        },
    };
});
exports.postRegister = postRegister;
const postLogin = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body }, res) {
    const { email, password } = body;
    const user = yield (0, user_helper_1.getUserByEmail)(email, { removePassword: false });
    if (!user) {
        throw {
            status: 400,
            message: "User doesn't exist",
        };
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw {
            status: 400,
            message: "Incorrect password",
        };
    }
    const role = yield Role_1.default.findOne({
        _id: user.roleId,
        isActive: true,
    });
    if (!role) {
        throw {
            status: 400,
            message: "Role not found",
        };
    }
    const jwtPayload = {
        userId: user._id.toString(),
        role: role.name,
        signedAt: new Date().toISOString(),
    };
    const accessToken = (0, jwt_1.signJwt)(jwtPayload, { expiresIn: "1h" });
    const refreshToken = (0, jwt_1.signJwt)(jwtPayload, { expiresIn: "30d" });
    (0, auth_helper_1.setAuthorizationToken)(res, accessToken);
    return {
        user,
        tokens: {
            accessToken,
            refreshToken,
        },
    };
});
exports.postLogin = postLogin;
const postLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_helper_1.setAuthorizationToken)(res, "");
    return {
        isLoggedOut: true,
    };
});
exports.postLogout = postLogout;
const getMe = (_a) => __awaiter(void 0, [_a], void 0, function* ({ headers, query }) {
    const { role } = query;
    const userId = headers.userId;
    const userRole = headers.role;
    if (role !== userRole) {
        throw {
            status: 401,
            message: "Invalid Role",
        };
    }
    const user = yield User_1.default.findOne({
        _id: (0, object_id_1.ObjectId)(userId),
        isActive: true,
    }, {
        email: 1,
    });
    return user;
});
exports.getMe = getMe;
