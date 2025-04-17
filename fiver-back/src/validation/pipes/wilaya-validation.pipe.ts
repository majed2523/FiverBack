// src/validation/pipes/wilaya-validation.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { WILAYAS } from '../../config/wilaya-pattern';

@Injectable()
export class WilayaValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!WILAYAS.includes(value.location)) {
      throw new BadRequestException('Wilaya non valide.');
    }
    return value;
  }
}
