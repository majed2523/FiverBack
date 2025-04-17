// src/validation/pipes/unique-email.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(value: any) {
    const exists = await this.prisma.user.findFirst({
      where: { email: value.email },
    });

    if (exists) {
      throw new BadRequestException('Cet email est déjà enregistré.');
    }

    return value;
  }
}
