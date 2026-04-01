import chalk from 'chalk';
import ora from 'ora';
import { config } from '../index.js';
import { createLLMAdapter } from '../llm-adapter.js';
import { LLM_PROVIDERS } from '../llm-providers.js';

export async function quickAsk(question, options) {
  const provider = options.provider || config.get('defaultProvider');
  const model = options.model || config.get('defaultModel');
  const apiKeys = config.get('apiKeys');
  const providerConfig = LLM_PROVIDERS[provider];
  const apiKey = apiKeys[providerConfig.keyName];

  const llm = createLLMAdapter({ provider, apiKey, model });

  const messages = [
    { role: 'system', content: 'You are a helpful AI assistant.' },
    { role: 'user', content: question }
  ];

  const spinner = ora('思考中...').start();

  try {
    const response = await llm.chat(messages);
    spinner.succeed(chalk.green('回答'));
    console.log(chalk.white('\n' + response.content + '\n'));
  } catch (error) {
    spinner.fail(chalk.red('请求失败'));
    console.log(chalk.red(`错误: ${error.message}\n`));
  }
}
