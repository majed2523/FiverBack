import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ToggleProviderServiceDto } from './dto/toggle-provider-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getAll() {
    return this.servicesService.getAll();
  }

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('toggle-provider')
  toggleService(@Req() req: Request, @Body() dto: ToggleProviderServiceDto) {
    return this.servicesService.toggleProviderService(
      (req.user as any).userId,
      dto.serviceId
    );
  }
}
