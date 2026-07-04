import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

import { CsrfService } from './csrf.service';

export const CSRF_COOKIE_NAME = 'csrf_token';
export const CSRF_HEADER_NAME = 'x-csrf-token';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private readonly csrfService: CsrfService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const csrfToken = this.getHeaderValue(request, CSRF_HEADER_NAME);
    const signedCsrfToken = this.getCookieValue(
      request.headers.cookie,
      CSRF_COOKIE_NAME,
    );

    if (!this.csrfService.verifyToken(csrfToken, signedCsrfToken)) {
      throw new ForbiddenException('CSRF token is invalid.');
    }

    return true;
  }

  private getHeaderValue(request: Request, headerName: string): string | undefined {
    const value = request.headers[headerName];

    return typeof value === 'string' ? value : undefined;
  }

  private getCookieValue(
    cookieHeader: string | undefined,
    cookieName: string,
  ): string | undefined {
    if (!cookieHeader) {
      return undefined;
    }

    return cookieHeader
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${cookieName}=`))
      ?.slice(cookieName.length + 1);
  }
}

