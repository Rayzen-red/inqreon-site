/** English names for the published Russian guides. The pages themselves stay in Russian. */

export interface PortalGuide {
  id: string;
  href: string;
  regional?: boolean;
  en: { title: string; description: string };
}

export const PORTAL_GUIDES: PortalGuide[] = [
  {
    id: 'deepseek',
    href: '/neyroseti/deepseek/',
    en: {
      title: 'DeepSeek: how to use it',
      description: 'Registration, the web app, modes, files, prompts, and the API. The guide is in Russian.',
    },
  },
  {
    id: 'besplatnye-neyroseti',
    href: '/neyroseti/besplatnye-neyroseti/',
    en: {
      title: 'Free AI tools, and the real limits',
      description: 'What the free tier includes and where it stops. The checked notes are in Russian.',
    },
  },
  {
    id: 'agregatory-neyrosetey',
    href: '/neyroseti/agregatory-neyrosetey/',
    en: {
      title: 'Sites that bundle many models',
      description: 'Chat aggregators and API aggregators, with prices as checked in the Russian article.',
    },
  },
  {
    id: 'gigachat',
    href: '/neyroseti/gigachat/',
    en: {
      title: 'GigaChat: sign-in and the free tier',
      description: 'How sign-in works and what the free tier includes. The guide is in Russian.',
    },
  },
  {
    id: 'neyroseti-dostupnye-v-rossii-i-sng',
    href: '/neyroseti/neyroseti-dostupnye-v-rossii-i-sng/',
    regional: true,
    en: {
      title: 'Which tools open in Russia, Uzbekistan, and Kazakhstan',
      description: 'A regional check. It stays in Russian and is not the frame for the English site.',
    },
  },
];
