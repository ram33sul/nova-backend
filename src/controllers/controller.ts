import { Request, Response } from "express";

// interface RequestWithQuery extends Request {
//   query: ParsedQs;
// }

const _delay = () =>
  new Promise((resolve) => setTimeout(() => resolve(5), 2000));

type Service = (req: Request, res: Response) => unknown;

const controller =
  (service: Service) => async (req: Request, res: Response) => {
    try {
      const response = await service(req, res);
      res.status(200).send(response);
    } catch (error) {
      const { status, message } = error as { message: string; status: number };
      res.status(status || 400).send({
        message: message || "Something went wrong",
      });
    }
  };

export default controller;
