import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class VerifyOtpDto {
    @IsNotEmpty({
        message: 'phone number is empty'
    })
    @IsPhoneNumber()
    phoneNumber: string

    @IsNotEmpty()
    @IsString()
    otp: string;
}