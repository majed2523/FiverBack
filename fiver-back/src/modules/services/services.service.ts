// modules/services/services.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceEntity } from './services.entity';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<ServiceEntity[]> {
    const services = await this.prisma.service.findMany();
    return services.map((service) => new ServiceEntity(service));
  }

  async create(dto: CreateServiceDto): Promise<ServiceEntity> {
    const service = await this.prisma.service.create({
      data: {
        name: dto.name,
      },
    });

    return new ServiceEntity(service);
  }

  async toggleProviderService(userId: string, serviceId: string) {
    const provider = await this.prisma.provider.findUnique({
      where: { id: userId },
      include: {
        services: true,
      },
    });

    if (!provider) throw new NotFoundException('Provider not found');

    const isAlreadyAdded = provider.services.some(
      (s) => s.serviceId === serviceId
    );

    if (isAlreadyAdded) {
      await this.prisma.providerService.delete({
        where: {
          providerId_serviceId: {
            providerId: userId,
            serviceId,
          },
        },
      });
      return { removed: true, serviceId };
    } else {
      await this.prisma.providerService.create({
        data: {
          providerId: userId,
          serviceId,
        },
      });
      return { added: true, serviceId };
    }
  }
  async searchProviders(serviceId?: string, wilaya?: string) {
    return this.prisma.provider.findMany({
      where: {
        user: {
          isActive: true, // ✅ assumes 'isActive' is a boolean on User
        },
        ...(wilaya
          ? { location: { equals: wilaya, mode: 'insensitive' } }
          : {}),
        ...(serviceId
          ? {
              services: {
                some: {
                  serviceId,
                },
              },
            }
          : {}),
      },
      include: { user: true },
    });
  }
}
