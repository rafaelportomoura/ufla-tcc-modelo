/* eslint-disable max-classes-per-file */
import { HTTP_STATUS_CODE } from '../constants/httpStatus';
import { CodeMessages } from '../types/CodeMessages';
import { HttpStatusCode } from '../types/HttpStatusCode';

export class BaseError extends Error {
  name: string;

  message: string;

  status: HttpStatusCode;

  code: string;

  constructor({ code, message }: CodeMessages, status: HttpStatusCode) {
    super(message);
    this.name = 'BaseError';
    this.message = message;
    this.code = code;
    this.status = status;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }

  toJSON() {
    const { message, code, name } = this;
    return { code, message, name };
  }
}

export class BadRequestError extends BaseError {
  constructor(code_message: CodeMessages) {
    super(code_message, HTTP_STATUS_CODE.BAD_REQUEST);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends BaseError {
  constructor(code_message: CodeMessages) {
    super(code_message, HTTP_STATUS_CODE.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends BaseError {
  constructor(code_message: CodeMessages) {
    super(code_message, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    this.name = 'InternalServerError';
  }
}

export class ValidationError extends BadRequestError {
  constructor(code_message: CodeMessages) {
    super(code_message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends InternalServerError {
  constructor(code_message: CodeMessages) {
    super(code_message);
    this.name = 'DatabaseError';
  }
}
