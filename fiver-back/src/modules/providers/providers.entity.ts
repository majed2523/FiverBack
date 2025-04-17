// modules/providers/providers.entity.ts

export class ProviderEntity {
  id!: string;
  email!: string;
  CIN?: string;
  cinVerified!: boolean;
  location?: string;
  bio?: string;
  isEnterprise!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<ProviderEntity>) {
    Object.assign(this, partial);
  }
}
