import { Schema, SchemaFactory , Prop } from "@nestjs/mongoose";


export type OrderDocument = Order & Document

@Schema({ timestamps: true }) 
export class Order {
    @Prop()
    username: string

    @Prop({ type: String, ref: 'User'})
    userId: string

    @Prop([
        {
            product: { type: String, ref: 'Product'},
            id: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ])
    products: Array<{
        product: string
        id: string
        name: string
        price: number
        quantity: number
    }>

    @Prop()
    totalPrice: number
}


export const OrderSchema = SchemaFactory.createForClass(Order)


OrderSchema.pre('save', function (next) {
    this.totalPrice = this.products.reduce((total, product) => 
    total + (product.price * product.quantity), 0);
    next();
});