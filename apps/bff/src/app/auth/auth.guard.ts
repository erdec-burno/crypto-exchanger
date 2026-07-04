import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';

export const SESSION_COOKIE_NAME = 'admin_session';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const sessionToken = this.getCookieValue(
      request.headers.cookie,
      SESSION_COOKIE_NAME,
    );

    if (!sessionToken) {
      throw new UnauthorizedException('Session is missing.');
    }

    this.authService.getUserFromSession(sessionToken);

    return true;
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

