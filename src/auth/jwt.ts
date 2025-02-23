import jwt, { SignOptions } from "jsonwebtoken";
import { RoleName } from "../types/role";

interface Payload {
  userId: string;
  role: RoleName;
  signedAt: string;
}

export const signJwt = (payload: Payload, options: SignOptions) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw {
      status: 500,
      message: "JWT Secret key is not configured!",
    };
  }
  return jwt.sign(payload, secretKey, options);
};

export const verifyJwt = (token: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw {
      status: 500,
      message: "JWT Secret key is not configured!",
    };
  }
  return jwt.verify(token, secretKey) as Payload;
};
