// src/modules/reviews/reviews.entity.ts
export class ReviewEntity {
  constructor(partial: Partial<ReviewEntity>) {
    Object.assign(this, partial);
  }

  id!: string;
  demandId!: string;
  clientId!: string;
  providerId!: string;
  rating!: number;
  text?: string;
  createdAt!: Date;
}
