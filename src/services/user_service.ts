import { Request } from "express";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../helpers/user_helper";
import User from "../models/User";
import { signJwt } from "../auth/jwt";

export const postRegister = async ({ body }: Request) => {
  const { email, password } = body;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
  };
  await User.create(newUser);
  return await getUserByEmail(email);
};

export const postLogin = async ({ body }: Request) => {
  const { email, password } = body;
  const user = await getUserByEmail(email, { removePassword: false });
  if (!user) {
    throw new Error("User doesn't exist");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Incorrect password");
  }
  const userIdString = user._id.toString();
  const accessToken = signJwt(userIdString, { expiresIn: "1h" });
  const refreshToken = signJwt(userIdString, { expiresIn: "30d" });
  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};
