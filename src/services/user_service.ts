import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../helpers/user_helper";
import User from "../models/User";
import { signJwt } from "../auth/jwt";
import Role from "../models/Role";
import { RoleName } from "../types/role";
import { ObjectId } from "../utils/object_id";
import { setAuthorizationToken } from "../helpers/auth_helper";

export const postRegister = async ({ body }: Request, res: Response) => {
  const { email, password, adminKey } = body;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw {
      status: 400,
      message: "User already exist",
    };
  }
  const isAdmin = adminKey === process.env.ADMIN_SECRET_KEY;
  const role = await Role.findOne({
    isActive: true,
    name: isAdmin ? RoleName.ADMIN : RoleName.USER,
  });
  if (!role) {
    throw {
      status: 400,
      message: "Role not found",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    roleId: role._id,
    email,
    password: hashedPassword,
  };
  const createdUser = await User.create(newUser);
  const user = await getUserByEmail(email);
  const jwtPayload = {
    userId: createdUser._id.toString(),
    role: role.name,
    signedAt: new Date().toISOString(),
  };
  const accessToken = signJwt(jwtPayload, { expiresIn: "1h" });
  const refreshToken = signJwt(jwtPayload, { expiresIn: "30d" });
  setAuthorizationToken(res, accessToken);
  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const postLogin = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const user = await getUserByEmail(email, { removePassword: false });
  if (!user) {
    throw {
      status: 400,
      message: "User doesn't exist",
    };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw {
      status: 400,
      message: "Incorrect password",
    };
  }
  const role = await Role.findOne({
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
  const accessToken = signJwt(jwtPayload, { expiresIn: "1h" });
  const refreshToken = signJwt(jwtPayload, { expiresIn: "30d" });
  setAuthorizationToken(res, accessToken);
  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const postLogout = async (req: Request, res: Response) => {
  setAuthorizationToken(res, "");
  return {
    isLoggedOut: true,
  };
};

export const getMe = async ({ headers, query }: Request) => {
  const { role } = query;
  const userId = headers.userId as string;
  const userRole = headers.role as string;
  if (role !== userRole) {
    throw {
      status: 401,
      message: "Invalid Role",
    };
  }
  const user = await User.findOne(
    {
      _id: ObjectId(userId),
      isActive: true,
    },
    {
      email: 1,
    }
  );
  return user;
};
