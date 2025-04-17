// modules/providers/providers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ProviderEntity } from './providers.entity';

@Injectable()
export class ProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyProfile(userId: string): Promise<ProviderEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { provider: true },
    });

    if (!user || !user.provider) {
      throw new NotFoundException('Provider not found');
    }

    return new ProviderEntity({
      id: user.id,
      email: user.email,
      CIN: user.provider.CIN ?? undefined,
      cinVerified: user.provider.cinVerified,
      bio: user.provider.bio ?? undefined,
      isEnterprise: user.provider.isEnterprise,
      location: user.provider.location ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async updateProfile(
    userId: string,
    dto: UpdateProviderDto
  ): Promise<ProviderEntity> {
    const provider = await this.prisma.provider.update({
      where: { id: userId },
      data: dto,
      include: { user: true },
    });

    return new ProviderEntity({
      id: provider.id,
      email: provider.user.email,
      CIN: provider.CIN ?? undefined,
      cinVerified: provider.cinVerified,
      bio: provider.bio ?? undefined,
      isEnterprise: provider.isEnterprise,
      location: provider.location ?? undefined,
      createdAt: provider.user.createdAt,
      updatedAt: provider.user.updatedAt,
    });
  }

  async getCINStatus(userId: string): Promise<{ cinVerified: boolean }> {
    const provider = await this.prisma.provider.findUnique({
      where: { id: userId },
    });
    if (!provider) throw new NotFoundException('Provider not found');
    return { cinVerified: provider.cinVerified };
  }
  async deactivateAccount(providerId: string) {
    const provider = await this.prisma.provider.findUnique({
      where: { id: providerId },
      include: {
        user: {
          select: { id: true },
        },
      },
    });

    if (!provider || !provider.user) {
      throw new NotFoundException('Provider not found or missing linked user.');
    }

    const userId = provider.user.id;

    await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    return { message: 'Account successfully deactivated.' };
  }
}
