import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DriveModule } from './drive/drive.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
  imports: [
    UserModule,
    DriveModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
  ],
})
export class AppModule {}
