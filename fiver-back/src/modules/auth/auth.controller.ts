// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterClientDto } from './dto/register-client.dto';
import { RegisterProviderDto } from './dto/register-provider.dto';
import { LoginDto } from './dto/login.dto';
import { CINValidationPipe } from '../../validation/pipes/cin-validation.pipe';
import { UniqueEmailPipe } from '../../validation/pipes/unique-email.pipe';
import { WilayaValidationPipe } from '../../validation/pipes/wilaya-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register/client')
  @UsePipes(UniqueEmailPipe)
  registerClient(@Body() dto: RegisterClientDto) {
    return this.authService.registerClient(dto);
  }

  @Post('register/provider')
  @UsePipes(CINValidationPipe, UniqueEmailPipe, WilayaValidationPipe)
  registerProvider(@Body() dto: RegisterProviderDto) {
    return this.authService.registerProvider(dto);
  }
}
