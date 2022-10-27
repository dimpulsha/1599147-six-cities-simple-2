import {NextFunction, Request, Response} from 'express';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { errorTransform } from '../../utils/common-utils.js';
import ValidationError from '../errors/validation-error.js';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req;
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return next (new ValidationError(`Validation error in ${req.path}`, errorTransform(errors)));
    }

    next();
  }
}
