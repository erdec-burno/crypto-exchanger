import type { Resource } from 'i18next';

import {
  commonNamespace,
  createI18n,
  defaultLanguage,
  type SupportedLanguage,
  validationNamespace,
  webNamespace,
} from '@shared/i18n';
import {
  commonEn,
  commonRu,
  validationEn,
  validationRu,
} from '@shared/i18n/resources';

import webEn from './locales/en.json';
import webRu from './locales/ru.json';

const webNamespaces = [
  commonNamespace,
  webNamespace,
  validationNamespace,
] as const;

const webResources = {
  en: {
    common: commonEn,
    validation: validationEn,
    web: webEn,
  },
  ru: {
    common: commonRu,
    validation: validationRu,
    web: webRu,
  },
} satisfies Resource;

export type CreateWebI18nOptions = {
  language?: SupportedLanguage;
};

export const createWebI18n = ({
  language = defaultLanguage,
}: CreateWebI18nOptions = {}) => {
  return createI18n({
    defaultNamespace: commonNamespace,
    language,
    namespaces: webNamespaces,
    resources: webResources,
  });
};
