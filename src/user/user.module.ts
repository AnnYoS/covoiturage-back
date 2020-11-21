import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserDao } from './dao/user.dao';

@Module({
  imports: [ MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]) ],
  controllers:[ UserController ],
  providers:[ UserService, Logger, UserDao],
})
export class UserModule{
}
