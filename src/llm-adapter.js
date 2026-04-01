/**
 * CCBoss Universal LLM Adapter
 * 统一适配所有 LLM API
 */

import axios from 'axios';
import { getProvider } from './llm-providers.js';

export class LLMAdapter {
  constructor(providerName, apiKey, model) {
    this.providerConfig = getProvider(providerName);

    if (!this.providerConfig) {
      throw new Error(`Unknown provider: ${providerName}`);
    }

    this.providerName = providerName;
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = this.providerConfig.baseUrl;
    this.type = this.providerConfig.type;
  }

  /**
   * 统一的 chat 接口
   */
  async chat(messages, options = {}) {
    switch (this.type) {
      case 'openai-compatible':
        return this.chatOpenAICompatible(messages, options);
      case 'anthropic':
        return this.chatAnthropic(messages, options);
      case 'bedrock':
        return this.chatBedrock(messages, options);
      case 'gemini':
        return this.chatGemini(messages, options);
      case 'baidu':
        return this.chatBaidu(messages, options);
      case 'spark':
        return this.chatSpark(messages, options);
      default:
        throw new Error(`Unsupported type: ${this.type}`);
    }
  }

  /**
   * OpenAI Compatible API (大多数国产大模型都兼容)
   * 支持: SkillBoss, OpenAI, OpenRouter, DeepSeek, Kimi, 智谱, 通义千问, 豆包, 混元, 百川, MiniMax, 零一万物, CPM
   */
  async chatOpenAICompatible(messages, options) {
    try {
      const requestBody = {
        model: this.model,
        messages: messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 4096,
        stream: options.stream ?? false
      };

      // 移除 undefined 的字段
      Object.keys(requestBody).forEach(key =>
        requestBody[key] === undefined && delete requestBody[key]
      );

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: options.timeout || 60000
        }
      );

      return {
        content: response.data.choices[0].message.content,
        model: response.data.model,
        usage: response.data.usage,
        finishReason: response.data.choices[0].finish_reason,
        raw: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Anthropic Claude API
   */
  async chatAnthropic(messages, options) {
    try {
      // 分离 system message
      const systemMessage = messages.find(m => m.role === 'system');
      const chatMessages = messages.filter(m => m.role !== 'system');

      const requestBody = {
        model: this.model,
        max_tokens: options.maxTokens || 4096,
        messages: chatMessages
      };

      if (systemMessage) {
        requestBody.system = systemMessage.content;
      }

      const response = await axios.post(
        `${this.baseUrl}/messages`,
        requestBody,
        {
          headers: {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          },
          timeout: options.timeout || 60000
        }
      );

      return {
        content: response.data.content[0].text,
        model: response.data.model,
        usage: response.data.usage,
        finishReason: response.data.stop_reason,
        raw: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * AWS Bedrock API
   * Note: Requires AWS SDK (@aws-sdk/client-bedrock-runtime)
   */
  async chatBedrock(messages, options) {
    try {
      // AWS Bedrock uses Anthropic message format
      const systemMessage = messages.find(m => m.role === 'system');
      const chatMessages = messages.filter(m => m.role !== 'system');

      const requestBody = {
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: options.maxTokens || 4096,
        messages: chatMessages
      };

      if (systemMessage) {
        requestBody.system = systemMessage.content;
      }

      // Note: This is a simplified implementation
      // For production, use @aws-sdk/client-bedrock-runtime
      const response = await axios.post(
        `https://bedrock-runtime.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/model/${this.model}/invoke`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: options.timeout || 60000
        }
      );

      return {
        content: response.data.content[0].text,
        model: this.model,
        usage: response.data.usage,
        finishReason: response.data.stop_reason,
        raw: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Google Gemini API
   */
  async chatGemini(messages, options) {
    try {
      // 转换消息格式
      const contents = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

      const requestBody = {
        contents: contents,
        generationConfig: {
          temperature: options.temperature ?? 0.7,
          maxOutputTokens: options.maxTokens ?? 4096
        }
      };

      const response = await axios.post(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: options.timeout || 60000
        }
      );

      return {
        content: response.data.candidates[0].content.parts[0].text,
        model: this.model,
        usage: response.data.usageMetadata,
        finishReason: response.data.candidates[0].finishReason,
        raw: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 百度文心 API
   */
  async chatBaidu(messages, options) {
    try {
      // 百度需要先获取 access_token
      const accessToken = await this.getBaiduAccessToken();

      // 转换消息格式
      const baiduMessages = messages.map(m => ({
        role: m.role === 'system' ? 'user' : m.role,
        content: m.content
      }));

      const response = await axios.post(
        `${this.baseUrl}/${this.model}?access_token=${accessToken}`,
        {
          messages: baiduMessages,
          temperature: options.temperature ?? 0.7
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: options.timeout || 60000
        }
      );

      return {
        content: response.data.result,
        model: this.model,
        usage: response.data.usage,
        finishReason: response.data.finish_reason,
        raw: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 讯飞星火 API
   */
  async chatSpark(messages, options) {
    try {
      // 星火使用 WebSocket，这里简化为 HTTP
      // 实际使用时可能需要 WebSocket 实现
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 4096
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: options.timeout || 60000
        }
      );

      return {
        content: response.data.choices[0].message.content,
        model: this.model,
        usage: response.data.usage,
        finishReason: response.data.choices[0].finish_reason,
        raw: response.data
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * 获取百度 access_token
   */
  async getBaiduAccessToken() {
    // 这里简化处理，实际应该缓存 token
    // API key 格式: "API_KEY:SECRET_KEY"
    const [apiKey, secretKey] = this.apiKey.split(':');

    const response = await axios.post(
      'https://aip.baidubce.com/oauth/2.0/token',
      null,
      {
        params: {
          grant_type: 'client_credentials',
          client_id: apiKey,
          client_secret: secretKey
        }
      }
    );

    return response.data.access_token;
  }

  /**
   * 列出可用模型
   */
  async listModels() {
    // 大多数提供商的模型列表是预定义的
    return this.providerConfig.models || [];
  }

  /**
   * 测试 API 连接
   */
  async testConnection() {
    try {
      const testMessages = [
        { role: 'user', content: 'Hello' }
      ];

      await this.chat(testMessages, { maxTokens: 10 });
      return { success: true, message: '连接成功' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  /**
   * 统一错误处理
   */
  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      const errorMap = {
        401: `${this.providerConfig.name} API key 无效或已过期`,
        429: `${this.providerConfig.name} API 请求频率限制`,
        500: `${this.providerConfig.name} 服务器错误`,
        503: `${this.providerConfig.name} 服务暂时不可用`
      };

      const message = errorMap[status] || `${this.providerConfig.name} API 错误 (${status})`;
      const details = data?.error?.message || data?.message || JSON.stringify(data);

      return new Error(`${message}: ${details}`);
    } else if (error.request) {
      return new Error(`无法连接到 ${this.providerConfig.name} - 请检查网络`);
    } else {
      return new Error(`${this.providerConfig.name} 请求失败: ${error.message}`);
    }
  }
}

/**
 * 创建 LLM 适配器（工厂函数）
 */
export function createLLMAdapter(config) {
  const { provider, apiKey, model } = config;

  if (!provider) {
    throw new Error('Provider is required');
  }

  if (!apiKey) {
    throw new Error(`API key for ${provider} is required. Run 'cc setup' to configure.`);
  }

  if (!model) {
    throw new Error('Model is required');
  }

  return new LLMAdapter(provider, apiKey, model);
}
