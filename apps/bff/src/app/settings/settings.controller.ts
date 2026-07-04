import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { SettingsService } from './settings.service';

@Controller('admin/settings')
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }
}

