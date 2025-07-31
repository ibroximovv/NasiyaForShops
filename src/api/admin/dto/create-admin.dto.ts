import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ type: String, description: 'Login of admin', example: 'Kimdir' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ type: String, description: 'Email of admin', example: 'kimdir@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ type: String, description: 'Phone number of admin', example: '+998910000000' })
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    @IsString()
    phone: string

    @ApiProperty({ type: String, description: 'Password of admin', example: '12345678' })
    @IsNotEmpty()
    @IsString()
    password: string
}
