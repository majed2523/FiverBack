// modules/services/services.entity.ts

export class ServiceEntity {
  id!: string;
  name!: string;

  constructor(partial: Partial<ServiceEntity>) {
    Object.assign(this, partial);
  }
}
