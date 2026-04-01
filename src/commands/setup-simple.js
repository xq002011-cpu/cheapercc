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
  const skillbossLocations = [
    join(homedir(), '.config/skillboss/api-key'),
    join(homedir(), '.skillboss/api-key')
  ];
  for (const loc of skillbossLocations) {
    if (existsSync(loc)) {
      try {
        const key = readFileSync(loc, 'utf8').trim();
        if (key) {
          detected.SKILLBOSS_API_KEY = key;
          break;
        }
      } catch (e) {}
    }
  }

  // OpenAI
  if (process.env.OPENAI_API_KEY) {
    detected.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  }

  // Anthropic
  if (process.env.ANTHROPIC_API_KEY) {
    detected.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  }

  // AWS Bedrock
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    detected.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
    detected.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    if (process.env.AWS_REGION) {
      detected.AWS_REGION = process.env.AWS_REGION;
    }
  }

  // Kimi (Moonshot)
  if (process.env.MOONSHOT_API_KEY) {
    detected.MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY;
  }

  // DeepSeek
  if (process.env.DEEPSEEK_API_KEY) {
    detected.DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  }

  return detected;
}

/**
 * Top providers for quick setup
 */
const TOP_PROVIDERS = [
  {
    id: 'skillboss',
    name: '⭐ SkillBoss (100+ models, 1 key)',
    keyName: 'SKILLBOSS_API_KEY',
    getUrl: 'https://skillboss.co/console',
    recommended: true
  },
  {
    id: 'openai',
    name: 'OpenAI (GPT-4, GPT-5)',
    keyName: 'OPENAI_API_KEY',
    getUrl: 'https://platform.openai.com/api-keys'
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    keyName: 'ANTHROPIC_API_KEY',
    getUrl: 'https://console.anthropic.com/settings/keys'
  },
  {
    id: 'kimi',
    name: 'Kimi (月之暗面, Free)',
    keyName: 'MOONSHOT_API_KEY',
    getUrl: 'https://platform.moonshot.cn/console/api-keys'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek (R1, Cheap)',
    keyName: 'DEEPSEEK_API_KEY',
    getUrl: 'https://platform.deepseek.com/api_keys'
  },
  {
    id: 'bedrock',
    name: 'AWS Bedrock (Enterprise)',
    keyName: 'AWS_ACCESS_KEY_ID',
    getUrl: 'https://console.aws.amazon.com/iam',
    needsMultipleKeys: true
  }
];

/**
 * Super Simple Setup - Just Works™
 */
export async function setupSimpleCommand() {
  console.log(chalk.blue.bold('\n🚀 CCBoss Quick Setup\n'));

  // Auto-detect existing keys
  const detected = autoDetectKeys();
  const detectedCount = Object.keys(detected).length;

  if (detectedCount > 0) {
    console.log(chalk.green(`✓ Found ${detectedCount} API key${detectedCount > 1 ? 's' : ''} automatically!\n`));
  }

  // Show available providers
  console.log(chalk.white('Choose providers to configure:\n'));

  const { selectedProviders } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedProviders',
      message: 'Select providers (Space to select, Enter to continue):',
      choices: TOP_PROVIDERS.map(p => ({
        name: `${p.name}${detected[p.keyName] ? chalk.green(' ✓ detected') : ''}`,
        value: p.id,
        checked: p.recommended || !!detected[p.keyName]
      })),
      validate: (answer) => {
        if (answer.length < 1) {
          return 'Select at least one provider';
        }
        return true;
      }
    }
  ]);

  // Configure each selected provider
  const apiKeys = {};
  const validatedProviders = [];

  for (const providerId of selectedProviders) {
    const providerInfo = TOP_PROVIDERS.find(p => p.id === providerId);
    const providerConfig = LLM_PROVIDERS[providerId];

    console.log(chalk.blue(`\n📝 ${providerConfig.name}`));

    let apiKey = null;

    // Check if already detected
    if (detected[providerInfo.keyName]) {
      const { useDetected } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useDetected',
          message: `Use detected API key? (${detected[providerInfo.keyName].substring(0, 20)}...)`,
          default: true
        }
      ]);

      if (useDetected) {
        apiKey = detected[providerInfo.keyName];

        // For AWS Bedrock, also get secret key and region
        if (providerId === 'bedrock') {
          apiKeys.AWS_ACCESS_KEY_ID = detected.AWS_ACCESS_KEY_ID;
          apiKeys.AWS_SECRET_ACCESS_KEY = detected.AWS_SECRET_ACCESS_KEY;
          apiKeys.AWS_REGION = detected.AWS_REGION || 'us-east-1';
        } else {
          apiKeys[providerInfo.keyName] = apiKey;
        }
      }
    }

    // If not detected or user wants to enter manually
    if (!apiKey) {
      console.log(chalk.gray(`   Get key: ${providerInfo.getUrl}\n`));

      if (providerId === 'bedrock') {
        // AWS Bedrock needs multiple keys
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
      } else {
        const { key } = await inquirer.prompt([
          {
            type: 'password',
            name: 'key',
            message: `${providerConfig.name} API key:`,
            mask: '*',
            validate: (input) => input.trim().length > 0 || 'API key cannot be empty'
          }
        ]);

        apiKeys[providerInfo.keyName] = key.trim();
      }
    }

    // Test connection
    const spinner = ora(`Testing ${providerConfig.name}...`).start();

    try {
      const testModel = providerConfig.models[0];
      const adapter = createLLMAdapter({
        provider: providerId,
        apiKey: providerId === 'bedrock' ? apiKeys.AWS_ACCESS_KEY_ID : apiKeys[providerInfo.keyName],
        model: testModel
      });

      const result = await adapter.testConnection();

      if (result.success) {
        spinner.succeed(chalk.green(`${providerConfig.name} ✓`));
        validatedProviders.push(providerId);
      } else {
        spinner.fail(chalk.red(`${providerConfig.name} failed: ${result.message}`));
      }
    } catch (error) {
      spinner.fail(chalk.red(`${providerConfig.name} error`));
      console.log(chalk.gray(`  ${error.message}`));
    }
  }

  if (validatedProviders.length === 0) {
    console.log(chalk.yellow('\n⚠️  No providers configured successfully.\n'));
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
    defaultModel = LLM_PROVIDERS[defaultProvider].models[0];
  }

  // Save config
  config.set('apiKeys', apiKeys);
  config.set('defaultProvider', defaultProvider);
  config.set('defaultModel', defaultModel);
  config.set('validatedProviders', validatedProviders);

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
