import { createWriteStream, WriteStream } from 'fs';
import { FileWriterInterface } from './file-writer.interface.js';

export default class TSVWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly fileName: string) {

    this.stream = createWriteStream(this.fileName, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: 32768*4,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void>  {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();

  }
}
