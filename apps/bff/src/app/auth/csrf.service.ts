import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

import { Injectable } from '@nestjs/common';

const CSRF_TOKEN_BYTES = 32;

@Injectable()
export class CsrfService {
  private readonly csrfSecret =
    process.env.CSRF_SECRET ??
    process.env.ADMIN_SESSION_SECRET ??
    'dev-csrf-secret';

  createToken(): { token: string; signedToken: string } {
    const token = randomBytes(CSRF_TOKEN_BYTES).toString('base64url');
    const signature = this.createSignature(token);

    return {
      token,
      signedToken: `${token}.${signature}`,
    };
  }

  verifyToken(token: string | undefined, signedToken: string | undefined): boolean {
    if (!token || !signedToken) {
      return false;
    }

    const [cookieToken, signature] = signedToken.split('.');

    if (!cookieToken || !signature || !this.secureCompare(token, cookieToken)) {
      return false;
    }

    return this.secureCompare(signature, this.createSignature(cookieToken));
  }

  private createSignature(value: string): string {
    return createHmac('sha256', this.csrfSecret)
      .update(value)
      .digest('base64url');
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

