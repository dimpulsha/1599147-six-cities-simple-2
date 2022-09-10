import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { TSVFileReader } from '../common/file-reader/tsv-file-reader.js';

export default class VersionCommand implements CliCommandInterface{
  public readonly name = '--import';

  public  execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.rawToArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(chalk.hex('#FFA500')(` Не удалось импортировать данные: « ${err.message}»`));
    }
  }
}
