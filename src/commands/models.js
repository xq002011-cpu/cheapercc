import chalk from 'chalk';
import Table from 'cli-table3';
import { config } from '../index.js';
import { LLM_PROVIDERS } from '../llm-providers.js';

export async function modelsCommand(options) {
  const validatedProviders = config.get('validatedProviders') || [];

  const table = new Table({
    head: [chalk.white.bold('Provider'), chalk.white.bold('Models')],
    colWidths: [25, 75]
  });

  for (const providerId of validatedProviders) {
    const provider = LLM_PROVIDERS[providerId];
    table.push([
      provider.name,
      provider.models.join('\n')
    ]);
  }

  console.log(chalk.blue.bold('\n📊 Available Models:\n'));
  console.log(table.toString());
  console.log();
}
