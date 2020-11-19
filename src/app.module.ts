import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { DriveModule } from './drive/drive.module';

@Module({
  imports: [HelloModule, UserModule, DriveModule],
})
export class AppModule {}
