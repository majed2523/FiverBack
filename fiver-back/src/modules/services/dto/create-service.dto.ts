// modules/services/dto/create-service.dto.ts
import { IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name!: string;
}
