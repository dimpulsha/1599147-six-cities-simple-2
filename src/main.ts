import { LoggerService } from './common/logger/logger.js';
import RESTApplication from './app/rest-application.js';

const loggerInstance = new LoggerService;
const RESTApp = new RESTApplication(loggerInstance);

await RESTApp.init();

