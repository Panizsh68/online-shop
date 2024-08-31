import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


export class RegisterDto {
    @IsNotEmpty({
        message: 'username is empty'
    })
    @IsString()
    username: string;

    @IsNotEmpty({
        message: 'address is empty'
    })
    @IsString()
    address: string;

    @IsNotEmpty({
        message: 'phone number is empty'
    })
    @IsPhoneNumber()
    phoneNumber: string;
}
