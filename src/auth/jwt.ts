import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (userId: string, options: SignOptions) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT Secret key is not configured!");
  }
  return jwt.sign(
    {
      userId,
    },
    secretKey,
    options
  );
};

export const verifyJwt = (token: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT Secret key is not configured!");
  }
  return jwt.verify(token, secretKey);
};
