import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import type { LoginRequest } from './auth.types';
import { SESSION_COOKIE_NAME } from './auth.guard';

@Controller('admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() body: unknown,
    @Res({ passthrough: true }) response: Response,
  ) {
    const input = this.parseLoginRequest(body);
    const { user, token, expiresAt } = this.authService.login(input);

    this.setSessionCookie(response, token, expiresAt);

    return user;
  }

  @Get('me')
  me(@Headers('cookie') cookieHeader: string | undefined) {
    return this.authService.getUserFromSession(
      this.getCookieValue(cookieHeader, SESSION_COOKIE_NAME),
    );
  }

  @Post('session/refresh')
  refreshSession(
    @Headers('cookie') cookieHeader: string | undefined,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token, expiresAt } = this.authService.refreshSession(
      this.getCookieValue(cookieHeader, SESSION_COOKIE_NAME),
    );

    this.setSessionCookie(response, token, expiresAt);

    return user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.clearSessionCookie(response);
  }

  private parseLoginRequest(body: unknown): LoginRequest {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Request body is required.');
    }

    const candidate = body as Partial<LoginRequest>;

    if (
      typeof candidate.email !== 'string' ||
      typeof candidate.password !== 'string'
    ) {
      throw new BadRequestException('Email and password are required.');
    }

    if (
      candidate.twoFactorCode !== undefined &&
      typeof candidate.twoFactorCode !== 'string'
    ) {
      throw new BadRequestException('2FA code must be a string.');
    }

    return {
      email: candidate.email,
      password: candidate.password,
      twoFactorCode: candidate.twoFactorCode,
    };
  }

  private setSessionCookie(
    response: Response,
    token: string,
    expiresAt: Date,
  ): void {
    response.cookie(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      path: '/',
    });
  }

  private clearSessionCookie(response: Response): void {
    response.clearCookie(SESSION_COOKIE_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
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
