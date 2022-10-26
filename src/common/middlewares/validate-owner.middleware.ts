import {MiddlewareInterface} from '../../types/middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { ValidateOwnerInterface } from '../../types/validate-owner.interface.js';
import HttpError from '../errors/http.errors.js';
import { StatusCodes } from 'http-status-codes';

type ParamsGetOffer = {
   offerId: string;
}

export class ValidateOwnerMiddleware implements MiddlewareInterface {
  constructor(
     private readonly service: ValidateOwnerInterface,
     private readonly entityName: string,
  ) {}

  public async execute({params, user }: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, Record<string, unknown>>, res: Response, next: NextFunction): Promise<void> {

    const { offerId } = params;
    if (!await this.service.checkOwner(offerId, user.id)) {
      return next (new HttpError(
        StatusCodes.BAD_REQUEST,
        `${this.entityName} created by another user`,
        'ValidationOwnerMiddleware'
      ));
    }

    next();
  }
}
