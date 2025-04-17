import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { ServicesModule } from './modules/services/services.module';
import { PrismaModule } from './prisma/prisma.module';
import { DemandsModule } from './modules/demands/demands.module'; // ✅ Added this line
import { ReviewsModule } from "./modules/reviews/review.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ClientsModule,
    ProvidersModule,
    ServicesModule,
    DemandsModule, // ✅ Registered here
    ReviewsModule,
  ],
})
export class AppModule {}
