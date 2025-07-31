import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInAdminDto {
    @ApiProperty({ type: String, description: 'Email of admin', example: 'kimdir@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ type: String, description: 'Password of admin', example: '12345678' })
    @IsNotEmpty()
    @IsString()
    password: string
}