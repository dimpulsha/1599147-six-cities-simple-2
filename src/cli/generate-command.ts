import got from 'got';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import { MockOffer } from '../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';
import  TSVWriter  from '../common/file-writer/file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockOffer;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const outputTSVStream = new TSVWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await outputTSVStream.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}

