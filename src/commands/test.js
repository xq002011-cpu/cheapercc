import chalk from 'chalk';
import ora from 'ora';
import { config } from '../index.js';
import { createLLMAdapter } from '../llm-adapter.js';
import { LLM_PROVIDERS } from '../llm-providers.js';

export async function testCommand(options) {
  const validatedProviders = config.get('validatedProviders') || [];
  const apiKeys = config.get('apiKeys');

  console.log(chalk.blue.bold('\n🧪 Testing API Connections...\n'));

  for (const providerId of validatedProviders) {
    const provider = LLM_PROVIDERS[providerId];
    const apiKey = apiKeys[provider.keyName];
    const model = provider.models[0];

    const spinner = ora(`Testing ${provider.name}...`).start();

    try {
      const llm = createLLMAdapter({ provider: providerId, apiKey, model });
      const result = await llm.testConnection();

      if (result.success) {
        spinner.succeed(chalk.green(`${provider.name} - OK`));
      } else {
        spinner.fail(chalk.red(`${provider.name} - FAIL: ${result.message}`));
      }
    } catch (error) {
      spinner.fail(chalk.red(`${provider.name} - ERROR: ${error.message}`));
    }
  }

  console.log();
}
