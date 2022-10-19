import { ValidationErrorInfo } from '../../types/validation-error-info.type.js';
import { StatusCodes } from 'http-status-codes';

export default class ValidationError extends Error {
  public httpStatusCode!: number;
  public detail: ValidationErrorInfo[];

  constructor(message: string, errors: ValidationErrorInfo[]) {
    super(message);

    this.httpStatusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
    this.detail = errors;
  }
}
