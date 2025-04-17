// src/modules/reviews/dto/create-review.dto.ts
import { IsUUID, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  demandId!: string;

  @IsUUID()
  providerId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsOptional()
  @IsString()
  text?: string;
}
