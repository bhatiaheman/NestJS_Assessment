import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';



@Module({
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
  imports: [PassportModule,
    JwtModule.register({
      secret: process.env.JWT,
      signOptions: { expiresIn: '1d' }
    })
  ]
})
export class AuthModule {}
