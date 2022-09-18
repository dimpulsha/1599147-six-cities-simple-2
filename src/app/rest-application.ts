import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';

export default class RESTApplication {
  private logger!: LoggerInterface;
  private configItem: ConfigInterface;

  constructor(logger: LoggerInterface, config: ConfigInterface) {
    this.logger = logger;
    this.configItem = config;
  }

  public async init() {

    this.logger.info('RESTService init...');
    this.logger.info(String(this.configItem.getItem('PORT')));
    this.logger.info(String(this.configItem.getItem('SALT')));
    this.logger.debug(JSON.stringify(process.env));

  }

}
