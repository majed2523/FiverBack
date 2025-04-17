// dto/register-provider.dto.ts
import {
  IsEmail,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsCIN } from '../../../validation/validators/cin.validator';
import { IsWilaya } from '../../../validation/validators/wilaya.validator';

export class RegisterProviderDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsCIN()
  CIN!: string;

  @IsBoolean()
  isEnterprise!: boolean;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsWilaya()
  location!: string;
}
