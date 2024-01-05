import { NextFunction, Request, Response } from 'express';
import { create_logger } from '../adapters/logger';
import { GetBusiness } from '../business/get';
import { create_request_id } from '../utils/createRequestId';

export async function getExampleController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const logger = create_logger({ metadata: { request_id: create_request_id(req) } });
  logger.debug({
    label: 'getExampleController',
    message: req.headers
  });
  try {
    const business = new GetBusiness();
    const response = await business.get();
    res.json(response);
  } catch (error) {
    next(error);
  }
}
