/* eslint-disable max-classes-per-file */
import { ApolloError } from "apollo-server-core";
import httpStatus from "http-status";
import { logger } from "./logger";

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export abstract class CustomError extends ApolloError {
  abstract statusCode: number;

  abstract status: string;

  constructor(message: unknown) {
    if (typeof message === "string") super(message);
    else if (message instanceof Error) {
      super(JSON.stringify(message, Object.getOwnPropertyNames(message)));
      logger.error(message);
    } else {
      super(JSON.stringify(message));
    }
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = httpStatus.BAD_REQUEST;

  status = "Bad Request";
}

export class NotFoundError extends CustomError {
  statusCode = httpStatus.NOT_FOUND;

  status = "Not Found";
}

export class UnAuthorizedError extends CustomError {
  statusCode = httpStatus.UNAUTHORIZED;

  status = "Unauthorized";
}

export class ServerError extends CustomError {
  statusCode = httpStatus.SERVICE_UNAVAILABLE;

  status = "Service unavailable";
}

export class Forbidden extends CustomError {
  statusCode = httpStatus.FORBIDDEN;

  status = "Forbidden";
}

export class InternalServerError extends CustomError {
  statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  status = "Internal server error";
}
