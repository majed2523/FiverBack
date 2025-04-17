import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDemandDto {
  @IsString()
  @IsNotEmpty()
  providerId!: string;

  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  // Optional: details like preferred time, note, etc. can be added later
}
