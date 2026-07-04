import { Injectable } from '@nestjs/common';

import type { Settings } from './settings.types';

const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 8;
const DEFAULT_SESSION_EXPIRY_WARNING_SECONDS = 60;

@Injectable()
export class SettingsService {
  getSettings(): Settings {
    return {
      exchangeEnabled: process.env.EXCHANGE_ENABLED !== 'false',
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
      defaultFiatCurrency: process.env.DEFAULT_FIAT_CURRENCY ?? 'USD',
      supportEmail: process.env.SUPPORT_EMAIL ?? 'support@example.com',
      sessionTtlSeconds: this.getPositiveIntegerEnv(
        'SESSION_TTL_SECONDS',
        DEFAULT_SESSION_TTL_SECONDS,
      ),
      sessionExpiryWarningSeconds: this.getPositiveIntegerEnv(
        'SESSION_EXPIRY_WARNING_SECONDS',
        DEFAULT_SESSION_EXPIRY_WARNING_SECONDS,
      ),
    };
  }

  private getPositiveIntegerEnv(name: string, defaultValue: number): number {
    const rawValue = process.env[name];

    if (!rawValue) {
      return defaultValue;
    }

    const value = Number(rawValue);

    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`${name} must be a positive integer.`);
    }

    return value;
  }
}

