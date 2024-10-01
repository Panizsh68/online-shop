import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserSchema } from './users/schema/user.schema';
import mongodbConfig from './config/mongodb.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig]
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database')
      })
      }),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    UsersModule,
    AuthModule
          ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
