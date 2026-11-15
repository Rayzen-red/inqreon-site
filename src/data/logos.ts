/** Unmodified product marks from Lobe Icons. See public/images/logos/NOTICE.txt. */

export interface Logo {
  src: string;
  name: string;
}

export const LOGOS: Record<string, Logo> = {
  chatgpt: { src: '/images/logos/openai.svg', name: 'OpenAI' },
  gemini: { src: '/images/logos/gemini-color.svg', name: 'Gemini' },
  claude: { src: '/images/logos/claude-color.svg', name: 'Claude' },
  deepseek: { src: '/images/logos/deepseek-color.svg', name: 'DeepSeek' },
  grok: { src: '/images/logos/grok.svg', name: 'Grok' },
  perplexity: { src: '/images/logos/perplexity-color.svg', name: 'Perplexity' },
  'microsoft-copilot': { src: '/images/logos/copilot-color.svg', name: 'Microsoft Copilot' },
  lovable: { src: '/images/logos/lovable-color.svg', name: 'Lovable' },
  cursor: { src: '/images/logos/cursor.svg', name: 'Cursor' },
  qwen: { src: '/images/logos/qwen-color.svg', name: 'Qwen' },
  openrouter: { src: '/images/logos/openrouter-color.svg', name: 'OpenRouter' },
};

const BY_NAME: Record<string, string> = {
  chatgpt: 'chatgpt',
  openai: 'chatgpt',
  gemini: 'gemini',
  claude: 'claude',
  deepseek: 'deepseek',
  grok: 'grok',
  xai: 'grok',
  perplexity: 'perplexity',
  microsoftcopilot: 'microsoft-copilot',
  copilot: 'microsoft-copilot',
  lovable: 'lovable',
  cursor: 'cursor',
  qwen: 'qwen',
  openrouter: 'openrouter',
};

export function logoForSlug(slug: string): Logo | undefined {
  return LOGOS[slug];
}

export function logoForName(name: string): Logo | undefined {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const slug = BY_NAME[key];
  return slug ? LOGOS[slug] : undefined;
}
