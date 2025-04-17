import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UpdateClientDto } from './dto/update-client.dto';
import { Request } from 'express';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('me')
  getProfile(@Req() req: Request) {
    return this.clientsService.getProfile((req.user as any).userId);
  }

  @Patch('me')
  updateProfile(@Req() req: Request, @Body() dto: UpdateClientDto) {
    return this.clientsService.updateProfile((req.user as any).userId, dto);
  }
}
