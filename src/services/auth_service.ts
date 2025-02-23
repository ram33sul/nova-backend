import { Request } from "express";
import { signJwt } from "../auth/jwt";
import { RoleName } from "../types/role";

export const postRefresh = async ({ headers }: Request) => {
  const userId = headers.userId;
  const role = headers.role as RoleName;
  if (!userId || typeof userId !== "string") {
    throw {
      status: 401,
      message: "Not authorized",
    };
  }
  const refreshToken = signJwt(
    {
      userId,
      role,
      signedAt: new Date().toISOString(),
    },
    { expiresIn: "30d" }
  );
  return { refreshToken };
};
