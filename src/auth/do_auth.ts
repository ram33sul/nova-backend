import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "./jwt";

export const do_auth = (req: Request, res: Response, _next: NextFunction) => {
  const token = req.cookies.authorization;
  if (!token) {
    res.status(401).send("Authorization Token is missing");
    return;
  }
  const tokenPayload = verifyJwt(token);
  if (!(tokenPayload.userId && tokenPayload.role)) {
    res.status(401).send("Not authorized");
    return;
  }
  req.headers.userId = tokenPayload.userId;
  req.headers.role = tokenPayload.role;
  _next();
};
