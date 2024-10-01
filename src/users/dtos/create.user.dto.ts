import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { Role } from "src/common/enums/role.enum"

export class CreateUserDto {

    // Username
    @IsNotEmpty({
        message: 'username is empty'
    })
    @IsString()
    username: string

    // Email
    @IsNotEmpty({
        message: 'email is empty'
    })
    @IsEmail({ })
    email: string

    // Password
    @IsNotEmpty({
        message: 'password is empty'
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 2
    })
    @IsString()
    password: string

    // Role
    role?: Role
}