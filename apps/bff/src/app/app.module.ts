import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
