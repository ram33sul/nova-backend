import { NextFunction, Request, Response } from "express";
import yup, { ObjectSchema } from "yup";

interface Params {
  body?: ObjectSchema<any>;
  query?: ObjectSchema<any>;
}

export const validator =
  (params: Params) =>
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      if (params.body) {
        req.body = await params.body.validate(req.body, { abortEarly: true });
      }
      if (params.query) {
        req.query = await params.query.validate(req.query, {
          abortEarly: true,
        });
      }
      _next();
    } catch (error) {
      res.status(400).send({
        message: "Invalid Inputs",
      });
    }
  };
