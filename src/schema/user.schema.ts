import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, isObjectIdOrHexString, ObjectId } from 'mongoose'
import { Role } from 'src/constant/role.constant';

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ type: String })
    _id: string
    
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, unique: true })
    phoneNumber: string;

    @Prop() 
    roles: Role.Admin | Role.User
}

export const UserSchema = SchemaFactory.createForClass(User)