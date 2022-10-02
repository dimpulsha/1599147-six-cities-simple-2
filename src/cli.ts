#!/usr/bin/env node

import 'reflect-metadata';
import VersionCommand from './cli/version-command.js';
import HelpCommand from './cli/help-command.js';
import CLIApplication from './app/cli-application.js';
import ImportCommand from './cli/import-command.js';
import GenerateCommand from './cli/generate-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand,  new ImportCommand, new GenerateCommand
]);
myManager.processCommand(process.argv);
