import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProvidersService } from './providers.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
@UseGuards(JwtAuthGuard)
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('me')
  getMyProfile(@Req() req: Request) {
    return this.providersService.getMyProfile((req.user as any).userId);
  }

  @Patch('me')
  updateProfile(@Req() req: Request, @Body() dto: UpdateProviderDto) {
    return this.providersService.updateProfile((req.user as any).userId, dto);
  }

  @Get('me/cin-status')
  getCinStatus(@Req() req: Request) {
    return this.providersService.getCINStatus((req.user as any).userId);
  }
}
