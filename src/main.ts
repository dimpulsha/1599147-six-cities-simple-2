import { LoggerService } from './common/logger/logger.service.js';
import { ConfigService } from './common/config/config.service.js';
import RESTApplication from './app/rest-application.js';

const loggerInstance = new LoggerService;
const configService = new ConfigService (loggerInstance);
const RESTApp = new RESTApplication(loggerInstance, configService );

await RESTApp.init();

