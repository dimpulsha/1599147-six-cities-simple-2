import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {ExceptionFilterInterface} from './exception-filter.interface.js';
import {RESTAppComponent} from '../../types/component.types.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import HttpError from './http.errors.js';
import { createErrorObject } from '../../utils/common-utils.js';
import ValidationError from './validation-error.js';
import { ServiceError } from '../../types/service-error.enum.js';


@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) private logger: LoggerInterface
  ) {
    this.logger.info('Register Exception filter...');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);
    res.status(error.httpStatusCode).json(createErrorObject(ServiceError.CommonError, error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.name}]: ${error.message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(ServiceError.ServiceError, error.message));
  }

  private handleValidationError(error: ValidationError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.name}]: ${error.message}`);
    error.detail.forEach((errorField) => this.logger.error(`[${errorField.property}] — ${errorField.messages}`));

    res.status(StatusCodes.BAD_REQUEST).json(createErrorObject(ServiceError.ValidationError, error.message, error.detail));
  }

  public catch(error: HttpError | Error | ValidationError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    } else if (error instanceof ValidationError) {
      return this.handleValidationError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
