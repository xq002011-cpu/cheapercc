#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import gradient from 'gradient-string';
import figlet from 'figlet';
import boxen from 'boxen';
import Conf from 'conf';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Import commands
import { chatCommand } from './commands/chat.js';
import { setupCommand } from './commands/setup.js';
import { setupSimpleCommand } from './commands/setup-simple.js';
import { configCommand } from './commands/config.js';
import { modelsCommand } from './commands/models.js';
import { testCommand } from './commands/test.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load package.json
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

// Initialize config
export const config = new Conf({ projectName: 'cheapercc' });

// Show banner
function showBanner() {
  console.log(
    gradient.pastel.multiline(
      figlet.textSync('cheaperCC', {
        font: 'Standard',
        horizontalLayout: 'default'
      })
    )
  );

  console.log(
    boxen(
      chalk.white.bold('Multi-LLM CLI\n') +
      chalk.gray('Switch Models Anytime • 100+ Models • 95% Savings'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    )
  );
}

// Check if setup is needed
function checkSetup() {
  const hasConfig = config.has('defaultProvider') && config.has('apiKeys');

  if (!hasConfig) {
    console.log(chalk.yellow('\n⚠️  cheaperCC is not configured yet.\n'));
    console.log(chalk.white('Run'), chalk.cyan.bold('cc setup'), chalk.white('to get started.\n'));
    process.exit(1);
  }
}

// Main CLI
const program = new Command();

program
  .name('cheapercc')
  .description('cheaperCC - One tool, 100+ LLMs. Cheaper than Claude Code.')
  .version(packageJson.version);

// Setup command (first-time configuration)
program
  .command('setup')
  .description('Configure cheaperCC with your API keys')
  .option('--advanced', 'Advanced setup with all providers')
  .action(async (options) => {
    showBanner();
    if (options.advanced) {
      await setupCommand();
    } else {
      await setupSimpleCommand();
    }
  });

// Chat command (default interactive mode)
program
  .command('chat', { isDefault: true })
  .description('Start interactive chat with AI agent')
  .option('-m, --model <model>', 'Specify model to use')
  .option('-p, --provider <provider>', 'Specify provider (skillboss, openai, anthropic, etc)')
  .option('-s, --system <prompt>', 'System prompt')
  .action(async (options) => {
    checkSetup();
    await chatCommand(options);
  });

// Quick ask command
program
  .command('ask <question>')
  .description('Ask a quick question and get response')
  .option('-m, --model <model>', 'Specify model to use')
  .option('-p, --provider <provider>', 'Specify provider')
  .action(async (question, options) => {
    checkSetup();
    const { quickAsk } = await import('./commands/ask.js');
    await quickAsk(question, options);
  });

// Config command
program
  .command('config')
  .description('Manage cheaperCC configuration')
  .option('-l, --list', 'List current configuration')
  .option('-s, --set <key> <value>', 'Set configuration value')
  .option('-g, --get <key>', 'Get configuration value')
  .option('-r, --reset', 'Reset all configuration')
  .action(async (options) => {
    await configCommand(options);
  });

// Models command
program
  .command('models')
  .description('List available models')
  .option('-p, --provider <provider>', 'Filter by provider')
  .action(async (options) => {
    checkSetup();
    await modelsCommand(options);
  });

// Test command
program
  .command('test')
  .description('Test API connection')
  .option('-p, --provider <provider>', 'Test specific provider')
  .action(async (options) => {
    checkSetup();
    await testCommand(options);
  });

// Code command (analyze/generate code)
program
  .command('code <task>')
  .description('Code-related tasks (analyze, generate, review, etc)')
  .option('-f, --file <file>', 'Specify file to work with')
  .option('-l, --language <language>', 'Specify programming language')
  .action(async (task, options) => {
    checkSetup();
    const { codeCommand } = await import('./commands/code.js');
    await codeCommand(task, options);
  });

// Agent command (spawn sub-agents)
program
  .command('agent <type>')
  .description('Spawn specialized agent (explorer, planner, reviewer, etc)')
  .option('-t, --task <task>', 'Specify task for agent')
  .action(async (type, options) => {
    checkSetup();
    const { agentCommand } = await import('./commands/agent.js');
    await agentCommand(type, options);
  });

// Version info
program
  .command('info')
  .description('Show cheaperCC information')
  .action(() => {
    showBanner();

    console.log(chalk.white.bold('📋 Configuration:\n'));
    console.log(chalk.gray(`   Config file: ${config.path}`));
    console.log(chalk.gray(`   Version: ${packageJson.version}`));

    if (config.has('defaultProvider')) {
      console.log(chalk.gray(`   Default provider: ${config.get('defaultProvider')}`));
      console.log(chalk.gray(`   Default model: ${config.get('defaultModel')}`));

      const apiKeys = config.get('apiKeys') || {};
      const configuredProviders = Object.keys(apiKeys).length;
      console.log(chalk.gray(`   Configured providers: ${configuredProviders}`));
    } else {
      console.log(chalk.yellow('\n   Not configured. Run `cc setup` first.\n'));
    }

    console.log(chalk.white.bold('\n📚 Resources:\n'));
    console.log(chalk.gray('   GitHub: https://github.com/yourusername/cheapercc'));
    console.log(chalk.gray('   Docs: https://cheapercc.com\n'));
  });

// Parse arguments
program.parse(process.argv);

// If no command provided, show help
if (!process.argv.slice(2).length) {
  showBanner();
  program.outputHelp();
}
