import chalk from 'chalk';
import Table from 'cli-table3';
import { config } from '../index.js';

export async function configCommand(options) {
  if (options.list || Object.keys(options).length === 0) {
    const table = new Table({
      head: [chalk.white.bold('Key'), chalk.white.bold('Value')]
    });

    const configData = config.store;
    Object.entries(configData).forEach(([key, value]) => {
      if (key === 'apiKeys') {
        table.push([key, chalk.gray('[hidden]')]);
      } else {
        table.push([key, JSON.stringify(value, null, 2)]);
      }
    });

    console.log(table.toString());
  }
}
