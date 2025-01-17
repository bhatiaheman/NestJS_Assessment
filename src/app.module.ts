import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma_service/prisma.service';
import { AuthModule } from './auth/auth.module';
import { CollegeModule } from './college/college.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, CollegeModule, ProductModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
  
})
export class AppModule {}
