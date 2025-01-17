import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDTO {
    @IsEmail()
        @IsNotEmpty()
        @ApiProperty()
        email: string;
    
        @IsNotEmpty()
        @IsString()
        @MinLength(6)
        @ApiProperty()
        password: string;

        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        firstName: string;

        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        lastName: string;
}