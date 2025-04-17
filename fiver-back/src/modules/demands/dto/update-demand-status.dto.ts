// src/modules/demands/dto/update-demand-status.dto.ts
import { IsEnum } from 'class-validator';
import { DemandStatus } from '@prisma/client';

export class UpdateDemandStatusDto {
  @IsEnum(DemandStatus)
  status!: DemandStatus;
}

// src/modules/demands/demands.entity.ts
export class DemandEntity {
  id!: string;
  status!: string;
  createdAt!: Date;
  providerId!: string;
  clientId!: string;
  serviceId!: string;

  constructor(partial: Partial<DemandEntity>) {
    Object.assign(this, partial);
  }
}
