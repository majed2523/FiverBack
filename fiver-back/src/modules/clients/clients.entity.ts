// modules/clients/clients.entity.ts

export class ClientEntity {
  id!: string;
  email!: string;
  firstName?: string;
  lastName?: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<ClientEntity>) {
    Object.assign(this, partial);
  }
}
