import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandStatusDto } from './dto/update-demand-status.dto';
import { DemandEntity } from './demands.entity';
import { DemandStatus } from '@prisma/client';

@Injectable()
export class DemandsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDemand(clientId: string, dto: CreateDemandDto) {
    const created = await this.prisma.demand.create({
      data: {
        ...dto,
        clientId,
        status: DemandStatus.PENDING,
      },
    });

    return new DemandEntity(created);
  }

  async getClientDemands(clientId: string, status?: string) {
    const demands = await this.prisma.demand.findMany({
      where: {
        clientId,
        status: status ? (status as DemandStatus) : undefined,
      },
    });
    return demands.map((d) => new DemandEntity(d));
  }

  async getProviderDemands(providerId: string, status?: string) {
    const demands = await this.prisma.demand.findMany({
      where: {
        providerId,
        status: status ? (status as DemandStatus) : undefined,
      },
    });
    return demands.map((d) => new DemandEntity(d));
  }

  async updateDemandStatus(
    providerId: string,
    demandId: string,
    dto: UpdateDemandStatusDto
  ) {
    const demand = await this.prisma.demand.findUnique({
      where: { id: demandId },
    });

    if (!demand) throw new NotFoundException('Demande non trouvée');

    if (demand.providerId !== providerId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres demandes reçues.'
      );
    }

    const updated = await this.prisma.demand.update({
      where: { id: demandId },
      data: { status: dto.status },
    });

    if (dto.status === DemandStatus.ACCEPTED) {
      const provider = await this.prisma.provider.findUnique({
        where: { id: providerId },
        include: { user: true },
      });
      
     console.log(`📨 Client ${demand.clientId} notified:`, {
       name: provider?.user.email,
       bio: provider?.bio,
       location: provider?.location,
     });  

      return {
        ...new DemandEntity(updated),
        providerInfo: {
          email: provider?.user?.email ?? '',
          bio: provider?.bio ?? '',
          location: provider?.location ?? '',
        },
      };
    }

    return new DemandEntity(updated);
  }
  async getProviderDemandsByStatus(providerId: string, status?: DemandStatus) {
    const demands = await this.prisma.demand.findMany({
      where: {
        providerId,
        ...(status ? { status } : {}),
      },
      include: { client: { include: { user: true } }, service: true },
      orderBy: { createdAt: 'desc' },
    });

    return demands.map((d) => new DemandEntity(d));
  }
}
