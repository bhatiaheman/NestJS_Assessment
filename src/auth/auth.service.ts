import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { LoginDTO } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';


@Injectable()
export class AuthService {

    constructor (private prisma: PrismaService, private jwtService: JwtService) {}

    async createUser(registerDTO: RegisterDTO) {
        const {email, firstName, lastName, password} = registerDTO;

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(existingUser) {
            throw new NotFoundException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                
            }
        })

        const payload =  {sub: newUser.id, email: newUser.email};
        const token = this.jwtService.sign(payload);

        return {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            
        }
    }

    async login(loginDTO: LoginDTO) : Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDTO.email
            }
        });

        if(!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);

        if(!isPasswordValid) {
            throw new NotFoundException('Invalid password');
        }

        const payload = {email: user.email, id: user.id};

        return {
            accessToken: this.jwtService.sign(payload),
        }
    }
}
