import { ConfigSchema } from './config.schema';
export interface ConfigInterface {
  getItem <T extends keyof ConfigSchema>(key:T): ConfigSchema[T];
}
