import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DriveModule } from './drive/drive.module';

@Module({
  imports: [
    UserModule,
    DriveModule
  ],
})
export class AppModule {}
