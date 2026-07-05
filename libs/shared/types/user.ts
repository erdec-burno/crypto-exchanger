import type { KycStatus } from './kyc';

export type User = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
  sessionExpiresAt: string;
  sessionExpiryWarningSeconds: number;
};

export type CustomerUser = {
  id: string;
  email: string;
  kycStatus: KycStatus;
};
