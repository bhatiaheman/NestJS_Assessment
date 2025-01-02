import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { RegisterDTO } from './dto/register.dto';


@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async Register(@Body() registerDTO: RegisterDTO) {
        return this.authService.createUser(registerDTO);
    }

    @Post('login')
    @ApiOkResponse({type: AuthEntity})
    async Login(@Body() {email, password}: LoginDTO) {
        return this.authService.login({email, password});
    }
}
