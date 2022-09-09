import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
          программа управления REST API

          вызов: main.js --<command> [--arguments]

         Команды:

            ${chalk.blue('--version:                   # выводит номер версии') }
            ${chalk.red('--help:                      # справка (этот текст). Команда по умолчанию')}
            ${chalk.green('--import <path>:             # импортирует данные из TSV')}
            ${chalk.yellow('--generator <n> <path> <url> # генерирует произвольное количество тестовых данных')}

        Вызов без параметров соответствует вызову: main.js --help
`);
  }
}
