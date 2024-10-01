import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../schema/user.schema";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create.user.dto";
import { UpdateUserDto } from "../dtos/update.user.dto";



@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const newUser = new  this.userModel(createUserDto)
        const user = await newUser.save()
        console.log('user saved to database')
        return user

        
    }

    async findById(id: string): Promise<UserDocument | null> {
        return await this.userModel.findById(id).lean().exec()
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({email}).lean().exec()
    }

    async findAllUsers(): Promise<UserDocument[] | null> {
        return await this.userModel.find().lean().exec()
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument | null> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true}).lean().exec()
    }

    async deleteUser(id: string): Promise<UserDocument | null> {
        return await this.userModel.findByIdAndDelete(id).lean().exec()
    }
}