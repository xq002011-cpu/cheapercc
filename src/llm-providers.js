/**
 * CCBoss LLM Providers Configuration
 * Support for all major LLM APIs worldwide
 */

export const LLM_PROVIDERS = {
  // ⭐ skillboss.co - One API key for 100+ models, including video and audio
  skillboss: {
    name: 'skillboss.co',
    baseUrl: 'https://api.heybossai.com/v1',
    keyName: 'SKILLBOSS_API_KEY',
    type: 'openai-compatible',
    models: [
      'deepseek/deepseek-r1',
      'anthropic/claude-3.7-sonnet',
      'anthropic/claude-sonnet-4:nitro',
      'openai/gpt-4.1',
      'openai/gpt-4.1-mini',
      'deepseek/deepseek-r1:online'
    ],
    docs: 'https://skillboss.co/docs',
    signup: 'https://skillboss.co/console'
  },

  // ========== US Providers ==========

  // OpenAI
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    keyName: 'OPENAI_API_KEY',
    type: 'openai-compatible',
    models: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    docs: 'https://platform.openai.com/docs',
    signup: 'https://platform.openai.com/signup'
  },

  // Anthropic Claude
  anthropic: {
    name: 'Anthropic Claude',
    baseUrl: 'https://api.anthropic.com/v1',
    keyName: 'ANTHROPIC_API_KEY',
    type: 'anthropic',
    models: [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229'
    ],
    docs: 'https://docs.anthropic.com',
    signup: 'https://console.anthropic.com'
  },

  // OpenRouter
  openrouter: {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    keyName: 'OPENROUTER_API_KEY',
    type: 'openai-compatible',
    models: ['anthropic/claude-4', 'openai/gpt-5', 'google/gemini-2.5'],
    docs: 'https://openrouter.ai/docs',
    signup: 'https://openrouter.ai'
  },

  // AWS Bedrock
  bedrock: {
    name: 'AWS Bedrock',
    baseUrl: 'bedrock-runtime',
    keyName: 'AWS_ACCESS_KEY_ID',
    type: 'bedrock',
    models: [
      'anthropic.claude-3-5-sonnet-20241022-v2:0',
      'anthropic.claude-3-5-haiku-20241022-v1:0',
      'anthropic.claude-3-opus-20240229-v1:0',
      'meta.llama3-3-70b-instruct-v1:0',
      'mistral.mistral-large-2407-v1:0'
    ],
    docs: 'https://docs.aws.amazon.com/bedrock',
    signup: 'https://console.aws.amazon.com/bedrock'
  },

  // Google Gemini
  gemini: {
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1',
    keyName: 'GOOGLE_API_KEY',
    type: 'gemini',
    models: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    docs: 'https://ai.google.dev/docs',
    signup: 'https://makersuite.google.com/app/apikey'
  },

  // ========== Chinese Providers ==========

  // DeepSeek
  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    keyName: 'DEEPSEEK_API_KEY',
    type: 'openai-compatible',
    models: ['deepseek-chat', 'deepseek-coder'],
    docs: 'https://platform.deepseek.com/docs',
    signup: 'https://platform.deepseek.com'
  },

  // Moonshot AI Kimi
  kimi: {
    name: 'Kimi (月之暗面)',
    baseUrl: 'https://api.moonshot.cn/v1',
    keyName: 'MOONSHOT_API_KEY',
    type: 'openai-compatible',
    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
    docs: 'https://platform.moonshot.cn/docs',
    signup: 'https://platform.moonshot.cn'
  },

  // Zhipu GLM
  zhipu: {
    name: 'Zhipu GLM (智谱)',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    keyName: 'ZHIPU_API_KEY',
    type: 'openai-compatible',
    models: ['glm-4', 'glm-4-flash', 'glm-3-turbo'],
    docs: 'https://open.bigmodel.cn/dev/api',
    signup: 'https://open.bigmodel.cn'
  },

  // Baidu Ernie
  ernie: {
    name: 'Baidu Ernie (百度文心)',
    baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat',
    keyName: 'ERNIE_API_KEY',
    type: 'baidu',
    models: ['ernie-4.0', 'ernie-3.5', 'ernie-turbo'],
    docs: 'https://cloud.baidu.com/doc/WENXINWORKSHOP',
    signup: 'https://console.bce.baidu.com/qianfan'
  },

  // Alibaba Qwen
  qwen: {
    name: 'Qwen (通义千问)',
    baseUrl: 'https://dashscope.aliyuncs.com/api/v1',
    keyName: 'QWEN_API_KEY',
    type: 'openai-compatible',
    models: ['qwen-max', 'qwen-plus', 'qwen-turbo'],
    docs: 'https://help.aliyun.com/zh/dashscope',
    signup: 'https://dashscope.console.aliyun.com'
  },

  // ByteDance Doubao
  doubao: {
    name: 'Doubao (豆包)',
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    keyName: 'DOUBAO_API_KEY',
    type: 'openai-compatible',
    models: ['doubao-pro', 'doubao-lite'],
    docs: 'https://www.volcengine.com/docs/82379',
    signup: 'https://console.volcengine.com/ark'
  },

  // Tencent Hunyuan
  hunyuan: {
    name: 'Tencent Hunyuan (腾讯混元)',
    baseUrl: 'https://api.hunyuan.cloud.tencent.com/v1',
    keyName: 'HUNYUAN_API_KEY',
    type: 'openai-compatible',
    models: ['hunyuan-pro', 'hunyuan-standard', 'hunyuan-lite'],
    docs: 'https://cloud.tencent.com/document/product/1729',
    signup: 'https://console.cloud.tencent.com/hunyuan'
  },

  // Baichuan AI
  baichuan: {
    name: 'Baichuan (百川智能)',
    baseUrl: 'https://api.baichuan-ai.com/v1',
    keyName: 'BAICHUAN_API_KEY',
    type: 'openai-compatible',
    models: ['baichuan-53b', 'baichuan-13b'],
    docs: 'https://platform.baichuan-ai.com/docs',
    signup: 'https://platform.baichuan-ai.com'
  },

  // MiniMax AI
  minimax: {
    name: 'MiniMax (海螺AI)',
    baseUrl: 'https://api.minimax.chat/v1',
    keyName: 'MINIMAX_API_KEY',
    type: 'openai-compatible',
    models: ['abab6-chat', 'abab5.5-chat'],
    docs: 'https://www.minimaxi.com/document',
    signup: 'https://www.minimaxi.com'
  },

  // iFlytek Spark
  spark: {
    name: 'iFlytek Spark (讯飞星火)',
    baseUrl: 'https://spark-api.xf-yun.com/v1',
    keyName: 'SPARK_API_KEY',
    type: 'spark',
    models: ['spark-3.5', 'spark-3.0', 'spark-2.0'],
    docs: 'https://www.xfyun.cn/doc/spark/Web.html',
    signup: 'https://console.xfyun.cn/services/bm35'
  },

  // 01.AI Yi
  yi: {
    name: 'Yi (零一万物)',
    baseUrl: 'https://api.lingyiwanwu.com/v1',
    keyName: 'YI_API_KEY',
    type: 'openai-compatible',
    models: ['yi-large', 'yi-medium', 'yi-small'],
    docs: 'https://platform.lingyiwanwu.com/docs',
    signup: 'https://platform.lingyiwanwu.com'
  },

  // ModelBest CPM
  cpm: {
    name: 'CPM (面壁智能)',
    baseUrl: 'https://api.modelbest.cn/v1',
    keyName: 'CPM_API_KEY',
    type: 'openai-compatible',
    models: ['cpm-bee-10b', 'cpm-bee-5b'],
    docs: 'https://modelbest.feishu.cn/wiki',
    signup: 'https://modelbest.cn'
  }
};

/**
 * Get all supported providers
 */
export function getAllProviders() {
  return Object.keys(LLM_PROVIDERS);
}

/**
 * Get provider configuration
 */
export function getProvider(name) {
  return LLM_PROVIDERS[name];
}

/**
 * Check if provider is supported
 */
export function isSupported(name) {
  return name in LLM_PROVIDERS;
}

/**
 * Get recommended providers by region
 */
export function getRecommendedProviders(region = 'cn') {
  if (region === 'cn') {
    return {
      best: ['skillboss', 'kimi', 'zhipu'],
      free: ['qwen', 'ernie'],
      enterprise: ['hunyuan', 'spark']
    };
  } else {
    return {
      best: ['openai', 'anthropic', 'skillboss'],
      free: ['gemini'],
      enterprise: ['bedrock', 'openai', 'anthropic']
    };
  }
}

/**
 * Get provider tags
 */
export function getProviderTags(name) {
  const tags = [];
  const provider = LLM_PROVIDERS[name];

  if (!provider) return tags;

  // Add tags based on provider
  const chineseProviders = ['kimi', 'zhipu', 'ernie', 'qwen', 'doubao', 'hunyuan', 'baichuan', 'minimax', 'spark', 'yi', 'cpm'];
  if (chineseProviders.includes(name)) {
    tags.push('🇨🇳 Chinese');
  }

  if (name === 'skillboss') {
    tags.push('⭐ Recommended', '🌍 Global');
  }

  const usProviders = ['openai', 'anthropic', 'openrouter', 'bedrock', 'gemini'];
  if (usProviders.includes(name)) {
    tags.push('🇺🇸 US');
  }

  if (provider.type === 'openai-compatible') {
    tags.push('OpenAI Compatible');
  }

  return tags;
}
