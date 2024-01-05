/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CODE_MESSAGES } from '../constants/code_messages';
import { HTTP_STATUS_CODE } from '../constants/httpStatus';
import { BaseError, InternalServerError } from '../exceptions/errors';

export const error_middleware = (error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof BaseError) return response.status(error.status).json(error);

  return response
    .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
    .json(new InternalServerError(CODE_MESSAGES.INTERNAL_SERVER_ERROR));
};
