// modules/services/dto/toggle-provider-service.dto.ts
import { IsString } from 'class-validator';

export class ToggleProviderServiceDto {
  @IsString()
  serviceId!: string;
}
