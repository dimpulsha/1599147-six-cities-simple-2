import {StatusCodes} from 'http-status-codes';
import {NextFunction, Request, Response} from 'express';
import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http.errors.js';


export class UnPrivateRouteMiddleware implements MiddlewareInterface {
  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.user) {
      return next(new HttpError(
        StatusCodes.BAD_REQUEST,
        'Client must by Unauthorized',
        'PrivateRouteMiddleware'
      ));
    }

    return next();
  }
}
