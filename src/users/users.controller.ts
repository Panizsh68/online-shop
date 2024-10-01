import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dtos/update.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        console.log('Received DTO:', createUserDto);
        return await this.usersService.createUser(createUserDto)
    }

    @Get(':id')
    async findOneUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.findOneUser(id)
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return await this.usersService.findAllUsers()
    }

    @Patch(':id')
    async updateUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:string): Promise<User> {
        return await this.usersService.deleteUser(id)
    }

}
