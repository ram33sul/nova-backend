import { Request } from "express";
import { signJwt } from "../auth/jwt";

export const postRefresh = async ({ headers }: Request) => {
  const userId = headers.userId;
  if (!userId || typeof userId !== "string") {
    throw new Error("Not authorized");
  }
  const refreshToken = signJwt(userId, { expiresIn: "30d" });
  return { refreshToken };
};
