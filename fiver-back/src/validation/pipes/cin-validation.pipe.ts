// src/validation/pipes/cin-validation.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CINValidationPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(value: any) {
    const exists = await this.prisma.provider.findFirst({
      where: { CIN: value.CIN },
    });

    if (exists) {
      throw new BadRequestException('Ce numéro de CIN est déjà utilisé.');
    }

    return value;
  }
}
