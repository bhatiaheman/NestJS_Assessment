import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDTO {


    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string;
}