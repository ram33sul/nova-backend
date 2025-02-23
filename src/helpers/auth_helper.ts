import { Response } from "express";

export const setAuthorizationToken = (res: Response, token: string) => {
  res.cookie("authorization", token, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000,
    path: "/",
    sameSite: "lax",
  });
};
