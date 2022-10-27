import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
          программа управления REST API

          вызов: cli.js --<command> [--arguments]

         Команды:

            ${chalk.blue('--version:                   # выводит номер версии') }
            ${chalk.red('--help:                      # справка (этот текст). Команда по умолчанию')}
            ${chalk.green('--import <path> <DB-login> <DB-password> <DB-server> <DB-name> <salt-phrase>  :  # импортирует данные из TSV в базу данных. Пример: --import ./_temp/test-data.tsv admin admin 127.0.0.1 citiesDB 123456')}
            ${chalk.yellow('--generator <n> <path> <url> # генерирует произвольное количество тестовых данных')}

        Вызов без параметров соответствует вызову: cli.js --help
`);
  }
}
