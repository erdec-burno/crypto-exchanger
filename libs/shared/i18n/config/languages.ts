export const supportedLanguages = ['en', 'ru'] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = 'en';
export const fallbackLanguage: SupportedLanguage = 'en';

export const isSupportedLanguage = (
  language: string,
): language is SupportedLanguage => {
  return supportedLanguages.some(
    (supportedLanguage) => supportedLanguage === language,
  );
};

