import { IsNotEmpty, IsPhoneNumber} from "class-validator";


export class LoginDto {
    @IsNotEmpty({
        message: 'phone number is empty'
    })
    @IsPhoneNumber()
    phoneNumber: string;
}