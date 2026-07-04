import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CsrfGuard } from './csrf.guard';
import { CsrfService } from './csrf.service';

@Module({
  controllers: [AuthController],
  providers: [AuthGuard, AuthService, CsrfGuard, CsrfService],
  exports: [AuthGuard, AuthService, CsrfGuard, CsrfService],
})
export class AuthModule {}
