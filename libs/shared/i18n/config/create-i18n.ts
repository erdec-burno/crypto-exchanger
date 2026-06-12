import { createInstance, type InitOptions, type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import {
  defaultLanguage,
  fallbackLanguage as defaultFallbackLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from './languages';

export type CreateI18nOptions = {
  defaultNamespace: string;
  fallbackLanguage?: SupportedLanguage | false;
  language?: SupportedLanguage;
  namespaces: readonly string[];
  resources: Resource;
};

export const createI18n = async ({
  defaultNamespace,
  fallbackLanguage = defaultFallbackLanguage,
  language = defaultLanguage,
  namespaces,
  resources,
}: CreateI18nOptions) => {
  const instance = createInstance();
  const options: InitOptions = {
    resources,
    lng: language,
    fallbackLng: fallbackLanguage,
    supportedLngs: [...supportedLanguages],
    ns: [...namespaces],
    defaultNS: defaultNamespace,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  };

  await instance.use(initReactI18next).init(options);

  return instance;
};
