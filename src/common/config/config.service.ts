import { config } from 'dotenv';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import {configSchema, ConfigSchema} from './config.schema.js';

export class ConfigService implements ConfigInterface {

  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;

    const parseConfig = config();

    if (parseConfig.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    // this.config = <DotenvParseOutput>parseConfig.parsed;
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
