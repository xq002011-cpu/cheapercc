import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { config } from '../index.js';
import { createLLMAdapter } from '../llm-adapter.js';
import { LLM_PROVIDERS } from '../llm-providers.js';

export async function chatCommand(options) {
  console.log(chalk.blue.bold('\n💬 CCBoss Chat Mode\n'));

  // 获取配置
  const provider = options.provider || config.get('defaultProvider');
  const model = options.model || config.get('defaultModel');
  const apiKeys = config.get('apiKeys');
  const providerConfig = LLM_PROVIDERS[provider];
  const apiKey = apiKeys[providerConfig.keyName];

  console.log(chalk.gray(`Provider: ${providerConfig.name}`));
  console.log(chalk.gray(`Model: ${model}\n`));

  // 创建适配器
  const llm = createLLMAdapter({ provider, apiKey, model });

  // 对话历史
  const messages = [];

  // 系统 prompt
  if (options.system) {
    messages.push({ role: 'system', content: options.system });
  } else {
    messages.push({ role: 'system', content: 'You are a helpful AI assistant powered by CCBoss CLI.' });
  }

  console.log(chalk.yellow('输入 "/exit" 退出, "/clear" 清空历史, "/help" 查看帮助\n'));

  // 主对话循环
  while (true) {
    const { userInput } = await inquirer.prompt([
      {
        type: 'input',
        name: 'userInput',
        message: chalk.cyan('You:'),
        validate: (input) => input.trim().length > 0 || '请输入内容'
      }
    ]);

    const input = userInput.trim();

    // 处理特殊命令
    if (input === '/exit' || input === '/quit') {
      console.log(chalk.yellow('\n👋 Goodbye!\n'));
      break;
    }

    if (input === '/clear') {
      messages.length = 1;
      console.log(chalk.yellow('\n🧹 对话历史已清空\n'));
      continue;
    }

    if (input === '/help') {
      console.log(chalk.blue('\n📚 Commands:\n'));
      console.log(chalk.white('  /exit, /quit  - 退出对话'));
      console.log(chalk.white('  /clear        - 清空对话历史'));
      console.log(chalk.white('  /help         - 显示帮助\n'));
      continue;
    }

    // 添加用户消息
    messages.push({ role: 'user', content: input });

    // 发送请求
    const spinner = ora('思考中...').start();

    try {
      const response = await llm.chat(messages);
      spinner.stop();

      // 显示 AI 回复
      console.log(chalk.green('\nAI: ') + chalk.white(response.content) + '\n');

      // 添加到历史
      messages.push({ role: 'assistant', content: response.content });

      // 显示 token 使用
      if (response.usage) {
        const total = response.usage.total_tokens || response.usage.totalTokens || '?';
        console.log(chalk.gray(`Tokens: ${total}\n`));
      }
    } catch (error) {
      spinner.fail(chalk.red('请求失败'));
      console.log(chalk.red(`错误: ${error.message}\n`));
    }
  }
}
