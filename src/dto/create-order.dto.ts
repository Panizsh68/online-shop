import {  IsNotEmpty, IsNumber } from "class-validator"


export class ProductDto {
    id: string

    @IsNotEmpty({
        message: 'quantity is empty'
    })
    @IsNumber()
    quantity: number;
}

export class CreateOrderDTO {

    products: ProductDto[]
}