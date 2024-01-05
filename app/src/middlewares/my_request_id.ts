import { NextFunction, Request, Response } from 'express';

export const my_request_id_middleware = (req: Request, _: Response, next: NextFunction) => {
  req.headers.my_request_id = `${req.hostname}:${req.method}:${req.path}:${Date.now()}`;
  next();
};
