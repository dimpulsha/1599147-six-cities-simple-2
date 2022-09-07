import { readFileSync } from 'fs';
import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCommand implements CliCommandInterface{
  public readonly name = '--version';

  private getVersion(): string {
    const appJSON = readFileSync('./package.json', 'utf-8');
    const appJSONContent = JSON.parse(appJSON);
    return appJSONContent.version;
  }

  public async execute() {
    const version = this.getVersion();
    console.log(version);
  }
}
