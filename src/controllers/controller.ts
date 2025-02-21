import { Request, Response } from "express";

// interface RequestWithQuery extends Request {
//   query: ParsedQs;
// }

type Service = (req: Request, res: Response) => unknown;

const controller =
  (service: Service) => async (req: Request, res: Response) => {
    try {
      const response = await service(req, res);
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  };

export default controller;
