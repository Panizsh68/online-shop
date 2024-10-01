import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './repositories/user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository]
})
export class UsersModule {}
