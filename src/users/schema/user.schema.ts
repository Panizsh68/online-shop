import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role } from "src/common/enums/role.enum";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true})
export class User {

    @Prop({ 
        type: String,
        required: true
    })
    username: string

    @Prop({ 
        type: String,
        required: true
    })
    email: string

    @Prop({ 
        type: String,
        required: true,
        minlength: 8,
    })
    password: string

    @Prop({ 
        default: Role.User
    })
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)