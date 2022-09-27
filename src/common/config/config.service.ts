import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { RESTAppComponent } from '../../types/component.types.js';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';

@injectable()
export class ConfigService implements ConfigInterface {

  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(@inject(RESTAppComponent.LoggerInterface)  logger: LoggerInterface) {
    this.logger = logger;

    const parseConfig = config();

    if (parseConfig.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });
    this.config = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
    this.logger.debug(JSON.stringify(this.config));

  }

  getItem<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }

}
