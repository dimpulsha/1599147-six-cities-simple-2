import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { TSVFileReader } from '../common/file-reader/tsv-file-reader.js';

import { createComments } from '../utils/createComments.js';
import { getErrorMessage } from '../utils/common-utils.js';
import { ConsoleLoggerService } from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { MongoDBInterface } from '../common/database-client/mongo-db.interface.js';
import MongoDBService from '../common/database-client/mongo-db.service.js';
import { getMongoURI } from '../common/database-client/db-uri.js';

import CommentsDBService from '../modules/comments/comments-service.js';
import { CommentsModel } from '../modules/comments/comments.entity.js';
import { Comment } from '../types/comment.type.js';

const DEFAULT_DB_PORT = 27017;

export default class CommentCommand implements CliCommandInterface{
  public readonly name = '--comments';

  private databaseService!: MongoDBInterface;
  private logger!: LoggerInterface;
  private commentService: CommentsDBService;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.databaseService = new MongoDBService(this.logger);
    this.commentService = new CommentsDBService(this.logger, CommentsModel);
  }

  private async saveComments(comments: Comment) {

    await this.commentService.create(comments);
  }


  private async onLine(rowComment: string, resolve: () => void) {
    const offer = createComments(rowComment);
    await this.saveComments(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(chalk.green(`${count} rows imported.`));
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbName: string  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbName);

    await this.databaseService.connect(uri);
    const importReader = new TSVFileReader(filename.trim());
    importReader.on('line', this.onLine);
    importReader.on('end', this.onComplete);

    try {
      await importReader.read();
    } catch(err) {
      console.log(chalk.hex('#FFA500')(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }

}
