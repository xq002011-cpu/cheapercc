import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { config } from '../index.js';
import { existsSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { createLLMAdapter } from '../llm-adapter.js';
import { LLM_PROVIDERS } from '../llm-providers.js';

/**
 * Auto-detect API keys from common locations
 */
function autoDetectKeys() {
  const detected = {};

  // SkillBoss
  const skillbossLocs = [
    join(homedir(), '.config/skillboss/api-key'),
    join(homedir(), '.skillboss/api-key')
  ];
  for (const loc of skillbossLocs) {
    if (existsSync(loc)) {
      try {
        const key = readFileSync(loc, 'utf8').trim();
        if (key) detected.SKILLBOSS_API_KEY = key;
      } catch (e) {}
    }
  }

  // Check env vars
  if (process.env.OPENAI_API_KEY) detected.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (process.env.ANTHROPIC_API_KEY) detected.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (process.env.MOONSHOT_API_KEY) detected.MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY;
  if (process.env.DEEPSEEK_API_KEY) detected.DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  if (process.env.ZHIPU_API_KEY) detected.ZHIPU_API_KEY = process.env.ZHIPU_API_KEY;
  if (process.env.QWEN_API_KEY) detected.QWEN_API_KEY = process.env.QWEN_API_KEY;
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    detected.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
    detected.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
  }

  return detected;
}

/**
 * Unified cheaperCC Setup - All Providers
 */
export async function setupCommand() {
  console.log(chalk.blue.bold('\n🚀 cheaperCC Setup\n'));

  // Auto-detect existing keys
  const detected = autoDetectKeys();
  const detectedCount = Object.keys(detected).length;

  if (detectedCount > 0) {
    console.log(chalk.green(`✓ Auto-detected ${detectedCount} API key${detectedCount > 1 ? 's' : ''}\n`));
  }

  // Show all providers as menu
  console.log(chalk.white('Select AI providers to configure:\n'));

  const providerChoices = Object.entries(LLM_PROVIDERS).map(([id, provider]) => {
    const keyName = provider.keyName;
    const hasKey = detected[keyName];
    const marker = hasKey ? chalk.green(' ✓') : '';

    return {
      name: `${provider.name}${marker}`,
      value: id,
      checked: !!hasKey  // Auto-check if detected
    };
  });

  const { selectedProviders } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedProviders',
      message: 'Choose providers (Space to select, Enter to continue):',
      choices: providerChoices,
      pageSize: 15,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'Please select at least one provider';
        }
        return true;
      }
    }
  ]);

  // Configure each selected provider
  const apiKeys = {};
  const validatedProviders = [];

  for (const providerId of selectedProviders) {
    const provider = LLM_PROVIDERS[providerId];
    console.log(chalk.blue(`\n📝 ${provider.name}`));
    console.log(chalk.gray(`   Docs: ${provider.docs}\n`));

    let apiKey = null;

    // Check if already detected
    if (detected[provider.keyName]) {
      const { useDetected } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useDetected',
          message: `Use detected key? (${detected[provider.keyName].substring(0, 20)}...)`,
          default: true
        }
      ]);

      if (useDetected) {
        apiKey = detected[provider.keyName];
        apiKeys[provider.keyName] = apiKey;
      }
    }

    // If not detected or user declined, ask for key
    if (!apiKey) {
      console.log(chalk.gray(`   Get API key: ${provider.signup}\n`));

      // Special handling for AWS Bedrock
      if (providerId === 'bedrock') {
        const { accessKey, secretKey, region } = await inquirer.prompt([
          {
            type: 'password',
            name: 'accessKey',
            message: 'AWS Access Key ID:',
            mask: '*',
            validate: (input) => input.trim().length > 0 || 'Required'
          },
          {
            type: 'password',
            name: 'secretKey',
            message: 'AWS Secret Access Key:',
            mask: '*',
            validate: (input) => input.trim().length > 0 || 'Required'
          },
          {
            type: 'input',
            name: 'region',
            message: 'AWS Region:',
            default: 'us-east-1'
          }
        ]);

        apiKeys.AWS_ACCESS_KEY_ID = accessKey.trim();
        apiKeys.AWS_SECRET_ACCESS_KEY = secretKey.trim();
        apiKeys.AWS_REGION = region.trim();
        apiKey = accessKey; // For testing
      } else {
        const { key } = await inquirer.prompt([
          {
            type: 'password',
            name: 'key',
            message: `${provider.name} API Key:`,
            mask: '*',
            validate: (input) => input.trim().length > 0 || 'Cannot be empty'
          }
        ]);

        apiKey = key.trim();
        apiKeys[provider.keyName] = apiKey;
      }
    }

    // Test connection
    const spinner = ora(`Testing ${provider.name}...`).start();

    try {
      const testModel = provider.models[0];
      const adapter = createLLMAdapter({
        provider: providerId,
        apiKey: apiKey,
        model: testModel
      });

      const result = await adapter.testConnection();

      if (result.success) {
        spinner.succeed(chalk.green(`${provider.name} ✓`));
        validatedProviders.push(providerId);
      } else {
        spinner.fail(chalk.red(`${provider.name} failed: ${result.message}`));
      }
    } catch (error) {
      spinner.fail(chalk.red(`${provider.name} error`));
      console.log(chalk.gray(`  ${error.message}`));
    }
  }

  if (validatedProviders.length === 0) {
    console.log(chalk.yellow('\n⚠️  No providers configured.\n'));
    console.log(chalk.gray('Run ') + chalk.cyan('cb setup') + chalk.gray(' to try again.\n'));
    process.exit(1);
  }

  // Choose default provider
  let defaultProvider = validatedProviders[0];
  let defaultModel = LLM_PROVIDERS[defaultProvider].models[0];

  if (validatedProviders.length > 1) {
    const { provider } = await inquirer.prompt([
      {
        type: 'list',
        name: 'provider',
        message: '\nChoose default provider:',
        choices: validatedProviders.map(id => ({
          name: LLM_PROVIDERS[id].name,
          value: id
        })),
        default: validatedProviders.includes('skillboss') ? 'skillboss' : validatedProviders[0]
      }
    ]);
    defaultProvider = provider;
  }

  // Choose default model
  const { model } = await inquirer.prompt([
    {
      type: 'list',
      name: 'model',
      message: 'Choose default model:',
      choices: LLM_PROVIDERS[defaultProvider].models.map(m => ({
        name: m,
        value: m
      })),
      pageSize: 10
    }
  ]);
  defaultModel = model;

  // Save config
  config.set('apiKeys', apiKeys);
  config.set('defaultProvider', defaultProvider);
  config.set('defaultModel', defaultModel);
  config.set('validatedProviders', validatedProviders);

  // Show summary
  console.log(chalk.blue.bold('\n✅ Setup Complete!\n'));
  console.log(chalk.white('Default: ') + chalk.cyan(LLM_PROVIDERS[defaultProvider].name) + chalk.gray(` (${defaultModel})`));
  console.log(chalk.white('Configured: ') + chalk.cyan(validatedProviders.length) + chalk.gray(' provider' + (validatedProviders.length > 1 ? 's' : '')));

  console.log(chalk.blue('\n🚀 Try it:\n'));
  console.log(chalk.white('  cb ask "Hello!"'));
  console.log(chalk.white('  cb') + chalk.gray('                    # Interactive chat\n'));

  // Ask if want to start now
  const { startNow } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'startNow',
      message: 'Start chatting now?',
      default: true
    }
  ]);

  if (startNow) {
    console.log('');
    const { chatCommand } = await import('./chat.js');
    await chatCommand({});
  }
}
