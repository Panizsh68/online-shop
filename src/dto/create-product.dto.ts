import { IsBase64, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {

    @IsNotEmpty({
        message: 'name is empty'
    })
    @IsString()
    name: string;

    @IsNotEmpty({
        message: 'price is empty'
    })
    @IsNumber()
    price: number;

    @IsNotEmpty({
        message: 'description is empty'
    })
    @IsString()
    description: string;

    @IsNotEmpty({
        message: 'image is empty'
    })
    image: Buffer;
}