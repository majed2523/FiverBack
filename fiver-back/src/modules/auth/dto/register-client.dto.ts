// modules/auth/dto/register-client.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterClientDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;
}
