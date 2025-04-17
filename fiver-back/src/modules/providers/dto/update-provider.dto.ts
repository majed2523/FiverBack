// modules/providers/dto/update-provider.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateProviderDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsBoolean()
  isEnterprise?: boolean;
}
