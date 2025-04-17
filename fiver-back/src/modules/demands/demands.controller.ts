import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UpdateDemandStatusDto } from './dto/update-demand-status.dto';

@Controller('demands')
@UseGuards(JwtAuthGuard)
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: CreateDemandDto) {
    return this.demandsService.createDemand((req.user as any).userId, dto);
  }

  @Get('my')
  getClientDemands(@Req() req: Request, @Query('status') status?: string) {
    return this.demandsService.getClientDemands(
      (req.user as any).userId,
      status
    );
  }

  @Get('received')
  getProviderDemands(@Req() req: Request, @Query('status') status?: string) {
    return this.demandsService.getProviderDemands(
      (req.user as any).userId,
      status
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateDemandStatusDto
  ) {
    return this.demandsService.updateDemandStatus(
      (req.user as any).userId,
      id,
      dto
    );
  }
}
