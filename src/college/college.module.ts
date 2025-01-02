import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { PrismaService } from 'src/prisma_service/prisma.service';

@Module({
  controllers: [CollegeController],
  providers: [CollegeService, PrismaService],
  
})
export class CollegeModule {}
