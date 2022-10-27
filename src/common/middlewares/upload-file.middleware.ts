import {NextFunction, Request, Response} from 'express';
import {nanoid} from 'nanoid';
import multer, {diskStorage} from 'multer';
import mime from 'mime';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { IMAGE_EXTENSIONS } from '../../app.config.js';

export class UploadFileMiddleware implements MiddlewareInterface {

  constructor(
     private uploadDirectory: string,
     private fieldName: string,
  ) { }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        console.log(file.mimetype);
        const extension = mime.extension(file.mimetype) ?? '';
        const filename = nanoid();
        if (!IMAGE_EXTENSIONS.includes(extension)) {
          return callback(
            new Error(`Invalid file format. Only ${IMAGE_EXTENSIONS.toString} files are acceptable`),
            `${filename}.${extension}`
          );
        }

        callback(null, `${filename}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({storage})
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
