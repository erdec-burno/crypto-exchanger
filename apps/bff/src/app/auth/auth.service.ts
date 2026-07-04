import { createHmac, timingSafeEqual } from 'node:crypto';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import type {
  LoginRequest,
  SessionPayload,
  SessionUser,
  User,
} from './auth.types';

const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 8;
const DEFAULT_SESSION_EXPIRY_WARNING_SECONDS = 60;

@Injectable()
export class AuthService {
  private readonly user: User = {
    id: process.env.ADMIN_USER_ID ?? 'admin-local',
    email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
    displayName: process.env.ADMIN_DISPLAY_NAME ?? 'Admin',
    roles: ['admin'],
  };

  private readonly password = process.env.ADMIN_PASSWORD ?? 'demo1234';
  private readonly sessionSecret =
    process.env.ADMIN_SESSION_SECRET ?? 'dev-admin-session-secret';
  private readonly sessionTtlSeconds = this.getSessionTtlSeconds();
  private readonly sessionExpiryWarningSeconds =
    this.getSessionExpiryWarningSeconds();

  login(input: LoginRequest): { user: SessionUser; token: string; expiresAt: Date } {
    if (
      !this.secureCompare(input.email, this.user.email) ||
      !this.secureCompare(input.password, this.password)
    ) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const expiresAt = new Date(Date.now() + this.sessionTtlSeconds * 1000);
    const token = this.signSession({
      sub: this.user.id,
      email: this.user.email,
      roles: this.user.roles,
      exp: Math.floor(expiresAt.getTime() / 1000),
    });

    return { user: this.createSessionUser(expiresAt), token, expiresAt };
  }

  getUserFromSession(token: string | undefined): SessionUser {
    const payload = this.verifySession(token);
    this.assertPayloadMatchesUser(payload);

    return this.createSessionUser(new Date(payload.exp * 1000), payload.roles);
  }

  refreshSession(token: string | undefined): { user: SessionUser; token: string; expiresAt: Date } {
    const payload = this.verifySession(token);
    this.assertPayloadMatchesUser(payload);

    const expiresAt = new Date(Date.now() + this.sessionTtlSeconds * 1000);
    const refreshedToken = this.signSession({
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles,
      exp: Math.floor(expiresAt.getTime() / 1000),
    });

    return {
      user: this.createSessionUser(expiresAt, payload.roles),
      token: refreshedToken,
      expiresAt,
    };
  }

  private signSession(payload: SessionPayload): string {
    const header = this.encodeBase64Url(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    );
    const body = this.encodeBase64Url(JSON.stringify(payload));
    const signature = this.createSignature(`${header}.${body}`);

    return `${header}.${body}.${signature}`;
  }

  private verifySession(token: string | undefined): SessionPayload {
    if (!token) {
      throw new UnauthorizedException('Session is missing.');
    }

    const [header, body, signature] = token.split('.');

    if (!header || !body || !signature) {
      throw new UnauthorizedException('Session is invalid.');
    }

    const expectedSignature = this.createSignature(`${header}.${body}`);

    if (!this.secureCompare(signature, expectedSignature)) {
      throw new UnauthorizedException('Session is invalid.');
    }

    const payload = this.parsePayload(body);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp <= currentTimestamp) {
      throw new UnauthorizedException('Session has expired.');
    }

    return payload;
  }

  private parsePayload(body: string): SessionPayload {
    try {
      const payload = JSON.parse(
        Buffer.from(body, 'base64url').toString('utf8'),
      ) as Partial<SessionPayload>;

      if (
        typeof payload.sub !== 'string' ||
        typeof payload.email !== 'string' ||
        typeof payload.exp !== 'number' ||
        !Array.isArray(payload.roles) ||
        !payload.roles.every((role) => typeof role === 'string')
      ) {
        throw new Error('Invalid session payload.');
      }

      return {
        sub: payload.sub,
        email: payload.email,
        roles: payload.roles,
        exp: payload.exp,
      };
    } catch {
      throw new UnauthorizedException('Session is invalid.');
    }
  }

  private createSignature(value: string): string {
    return createHmac('sha256', this.sessionSecret)
      .update(value)
      .digest('base64url');
  }

  private assertPayloadMatchesUser(payload: SessionPayload): void {
    if (payload.sub !== this.user.id || payload.email !== this.user.email) {
      throw new UnauthorizedException('Session is invalid.');
    }
  }

  private createSessionUser(expiresAt: Date, roles = this.user.roles): SessionUser {
    return {
      ...this.user,
      roles,
      sessionExpiresAt: expiresAt.toISOString(),
      sessionExpiryWarningSeconds: this.sessionExpiryWarningSeconds,
    };
  }

  private getSessionTtlSeconds(): number {
    return this.getPositiveIntegerEnv(
      'SESSION_TTL_SECONDS',
      DEFAULT_SESSION_TTL_SECONDS,
    );
  }

  private getSessionExpiryWarningSeconds(): number {
    return this.getPositiveIntegerEnv(
      'SESSION_EXPIRY_WARNING_SECONDS',
      DEFAULT_SESSION_EXPIRY_WARNING_SECONDS,
    );
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

  private encodeBase64Url(value: string): string {
    return Buffer.from(value, 'utf8').toString('base64url');
  }

  private secureCompare(left: string, right: string): boolean {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);

    return (
      leftBuffer.length === rightBuffer.length &&
      timingSafeEqual(leftBuffer, rightBuffer)
    );
  }
}
