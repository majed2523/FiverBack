import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './clients.entity';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string): Promise<ClientEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { client: true },
    });

    if (!user || !user.client) {
      throw new NotFoundException('Client not found');
    }

    return new ClientEntity({
      id: user.id,
      email: user.email,
      firstName: user.client.firstName ?? undefined,
      lastName: user.client.lastName ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async updateProfile(
    userId: string,
    dto: UpdateClientDto
  ): Promise<ClientEntity> {
    console.log('🔍 updateProfile called with:', { userId, dto });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { client: true },
    });

    if (!user?.client) {
      console.warn('⚠️ Client not found for userId:', userId);
      throw new NotFoundException('Client not found');
    }

    console.log('✅ Existing client data:', user.client);

    const updatedClient = await this.prisma.client.update({
      where: { id: user.client.id },
      data: {
        firstName: dto.firstName ?? undefined,
        lastName: dto.lastName ?? undefined,
      },
      include: { user: true },
    });

    console.log('✅ Updated client data:', updatedClient);

    return new ClientEntity({
      id: updatedClient.user.id,
      email: updatedClient.user.email,
      firstName: updatedClient.firstName ?? undefined,
      lastName: updatedClient.lastName ?? undefined,
      createdAt: updatedClient.user.createdAt,
      updatedAt: updatedClient.user.updatedAt,
    });
  }
}
