import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  DATABASE_URL: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PWD: string;
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
  DATABASE_NAME: {
    doc: 'Database name',
    format: String,
    env: 'REST_DATABASE_NAME',
    default: 'test'
  },
  DATABASE_USER: {
    doc: 'Database username',
    format: String,
    env: 'REST_DATABASE_USER',
    default: null
  },
  DATABASE_PWD: {
    doc: 'Database user password',
    format: String,
    env: 'REST_DATABASE_PWD',
    default: null
  },
  SERVICE_LOG_PATH: {
    doc: 'Path to LOG-files',
    format: String,
    env: 'REST_SERVICE_LOG_PATH',
    default: './logs'
  },
  SALT: {
    doc: 'Random value for security',
    format: String,
    env: 'REST_SALT',
    default: null
  }
});
