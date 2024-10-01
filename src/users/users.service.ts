import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dtos/update.user.dto';
import { error } from 'console';

@Injectable()
export class UsersService {
    constructor(@Inject() private readonly userRepository: UserRepository) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const existingUser = await this.userRepository.findByEmail(createUserDto.email)
            if (existingUser) {
                throw new ConflictException(' User already exists ')
            }
            const user = await this.userRepository.createUser(createUserDto)
            console.log('user passed usersService')
            return user
        }
        catch (error) {
            console.error(error)
            throw new InternalServerErrorException(' failed to create User ')
        }
    }


    async findOneUser(id: string): Promise<User> {
        try {
            return await this.userRepository.findById(id)
        }
        catch (error) {
            console.error(error)
            throw new NotFoundException(' User not found ')
        }
    }

    async findAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.findAllUsers()
        }
        catch (error) {
            console.error(error)
            throw new NotFoundException('finding All users failed')
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.findOneUser(id)
            if (!user) {
                throw new NotFoundException(' User not found ')
            }
            return await this.userRepository.updateUser(id, updateUserDto)
        }
        catch (error) {
            console.log(error) 
            throw new InternalServerErrorException('failed to update user')
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const user = await this.findOneUser(id)
            if (!user) {
                throw new NotFoundException(' User not found ')
            }
            return await this.userRepository.deleteUser(id)
        }
        catch (error) {
            console.log(error) 
            throw new InternalServerErrorException('failed to delete user')
        }
    }
}
