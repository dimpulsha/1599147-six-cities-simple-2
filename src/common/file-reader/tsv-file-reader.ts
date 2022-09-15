// import { readFileSync } from 'fs';
import EventEmitter from 'events';
import { createReadStream } from 'fs';
// import { Offer } from '../../types/offer.type.js';
// import { RoomType } from '../../types/room-type.enum.js';
import { FileReaderInterface } from './file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements FileReaderInterface  {
  // private rawData = '';
  // constructor(public filename: string) { }

  constructor(public filename: string) {
    super();
  }


  public async read(): Promise<void> {
    console.log(this.filename);

    const readStream = createReadStream(this.filename, {
      highWaterMark: 16384, // 16KB
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;
    for await (const chunk of readStream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);

  }

}

