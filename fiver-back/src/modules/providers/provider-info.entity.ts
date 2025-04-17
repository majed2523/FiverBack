// modules/providers/provider-info.entity.ts

export class ProviderInfoEntity {
  id!: string;
  email!: string;
  location?: string;
  bio?: string;
  isEnterprise!: boolean;

  constructor(partial: Partial<ProviderInfoEntity>) {
    Object.assign(this, partial);
  }
}
