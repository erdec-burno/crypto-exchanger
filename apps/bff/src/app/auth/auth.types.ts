export type User = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
};

export type SessionUser = User & {
  sessionExpiresAt: string;
  sessionExpiryWarningSeconds: number;
};

export type LoginRequest = {
  email: string;
  password: string;
  twoFactorCode?: string;
};

export type SessionPayload = {
  sub: string;
  email: string;
  roles: string[];
  exp: number;
};
