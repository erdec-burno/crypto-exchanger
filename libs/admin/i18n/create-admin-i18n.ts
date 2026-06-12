import type { ResourceLanguage } from 'i18next';

import {
  adminNamespace,
  commonNamespace,
  createI18n,
  defaultLanguage,
  type SupportedLanguage,
  validationNamespace,
} from '@shared/i18n';

const adminNamespaces = [
  adminNamespace,
  commonNamespace,
  validationNamespace,
] as const;

type AdminResources = Record<
  (typeof adminNamespaces)[number],
  ResourceLanguage
>;

const isResourceLanguage = (resource: unknown): resource is ResourceLanguage => {
  return (
    typeof resource === 'object' &&
    resource !== null &&
    !Array.isArray(resource)
  );
};

const loadResources = async (
  language: SupportedLanguage,
): Promise<AdminResources> => {
  const baseUrl = import.meta.env.BASE_URL;
  const response = await fetch(`${baseUrl}locales/${language}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load translations: ${language}`);
  }

  const resource: unknown = await response.json();

  if (!isResourceLanguage(resource)) {
    throw new Error(`Invalid translation resource: ${language}`);
  }

  const { admin, common, validation } = resource;

  if (
    !isResourceLanguage(admin) ||
    !isResourceLanguage(common) ||
    !isResourceLanguage(validation)
  ) {
    throw new Error(`Invalid translation namespaces: ${language}`);
  }

  return { admin, common, validation };
};

export type CreateAdminI18nOptions = {
  language?: SupportedLanguage;
};

export const createAdminI18n = async ({
  language = defaultLanguage,
}: CreateAdminI18nOptions = {}) => {
  const resources = await loadResources(language);

  return createI18n({
    defaultNamespace: adminNamespace,
    fallbackLanguage: false,
    language,
    namespaces: adminNamespaces,
    resources: {
      [language]: resources,
    },
  });
};
