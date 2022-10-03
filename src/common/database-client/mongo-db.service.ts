import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface.js';
import { RESTAppComponent } from '../../types/component.types.js';
import { MongoDBInterface } from './mongo-db.interface.js';

@injectable()
export default class MongoDBService implements MongoDBInterface {

  constructor(@inject(RESTAppComponent.LoggerInterface) private logger: LoggerInterface) { }

  public async connect(uri: string): Promise<void> {
    this.logger.info('Starting connect to DB (MongoDB)');
    await mongoose.connect(uri);
    this.logger.info('DB (MongoDB) connected');

  }

  public async disconnect(): Promise<void> {
    this.logger.info('Close connect to DB (MongoDB)');
    await mongoose.disconnect();
  }

}
