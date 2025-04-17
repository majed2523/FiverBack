import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './reviews.entity';
import { DemandStatus } from '@prisma/client'; // ✅ Proper enum import

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, dto: CreateReviewDto) {
    const demand = await this.prisma.demand.findUnique({
      where: { id: dto.demandId },
    });

    if (
      !demand ||
      demand.clientId !== clientId ||
      demand.status !== DemandStatus.COMPLETED // ✅ compare with enum, not string
    ) {
      throw new ForbiddenException(
        'Vous ne pouvez évaluer que des demandes terminées'
      );
    }

    const review = await this.prisma.review.create({
      data: {
        clientId,
        providerId: demand.providerId,
        demandId: dto.demandId,
        rating: dto.rating,
        text: dto.text ?? null,
      },
    });

    return new ReviewEntity({
      ...review,
      text: review.text ?? undefined, // ✅ ensure correct type for optional field
    });
  }

  async getByProvider(providerId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { providerId },
    });

    return reviews.map(
      (r) =>
        new ReviewEntity({
          ...r,
          text: r.text ?? undefined,
        })
    );
  }
}
