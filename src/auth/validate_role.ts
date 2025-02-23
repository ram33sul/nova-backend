import { NextFunction, Request, Response } from "express";
import { RoleName } from "../types/role";

export const validateRole =
  (roles: RoleName[]) => (req: Request, _: Response, _next: NextFunction) => {
    const role = req.headers.role as RoleName;
    if (!roles.includes(role)) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    }
    _next();
  };
