import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  DATABASE_URL: string;
  DATABASE_PORT: number;
  SERVICE_LOG_PATH: string;
  SALT: string;
 }

export const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'REST_PORT',
    default: 4900
  },
  DATABASE_URL: {
    doc: 'IP address for database connections',
    format: 'ipaddress',
    env: 'REST_DATABASE_URL',
    default: '127.0.0.1'
  },
  DATABASE_PORT: {
    doc: 'Port for database connections',
    format: 'port',
    env: 'REST_DATABASE_PORT',
    default: 4900
  },
  SERVICE_LOG_PATH: {
    doc: 'Path to LOG-files',
    format: '*',
    env: 'REST_SERVICE_LOG_PATH',
    default: './logs'
  },
  SALT: {
    doc: 'Random value for security',
    format: '*',
    env: 'REST_SERVICE_LOG_PATH',
    default: null
  }
});
