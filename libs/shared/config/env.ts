export type RuntimeConfig = {
  apiBaseUrl: string;
  adminAppUrl: string;
};

type ImportMetaEnvLike = Record<string, string | undefined>;

const DEFAULT_API_BASE_URL = 'https://api.example.com';
const DEFAULT_ADMIN_APP_URL = 'http://localhost:4201/login';

export function getRuntimeConfig(env: ImportMetaEnvLike = import.meta.env as unknown as ImportMetaEnvLike): RuntimeConfig {
  return {
    apiBaseUrl: env['VITE_API_BASE_URL'] ?? DEFAULT_API_BASE_URL,
    adminAppUrl: env['VITE_ADMIN_APP_URL'] ?? DEFAULT_ADMIN_APP_URL,
  };
}
