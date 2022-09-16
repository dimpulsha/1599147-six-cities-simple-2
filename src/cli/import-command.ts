import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { TSVFileReader } from '../common/file-reader/tsv-file-reader.js';
import { createOffer } from '../utils/createOffer.js';
import { getErrorMessage } from '../utils/common-utils.js';
import { LoggerService } from '../common/logger/logger.js';

export default class VersionCommand implements CliCommandInterface{
  public readonly name = '--import';
  private logger = new LoggerService;

  private onLine(rowOffer: string) {
    const offer = createOffer(rowOffer);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(chalk.green(`${count} rows imported.`));
    // this.logger.info(`${count} rows imported.`);
  }

  public async execute(filename: string): Promise<void> {
    const importReader = new TSVFileReader(filename.trim());
    importReader.on('line', this.onLine);
    importReader.on('end', this.onComplete);

    try {
      await importReader.read();
    } catch(err) {
      // console.log(chalk.hex('#FFA500')(`Can't read the file: ${getErrorMessage(err)}`));
      this.logger.error(`${getErrorMessage(err)}`);
    }
  }

}
