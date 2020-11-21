import { Logger, Module } from '@nestjs/common';
import { DriveController } from './drive.controller';
import { DriveService } from './drive.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Drive, DriveSchema } from './schemas/drive.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: Drive.name, schema: DriveSchema } ]) ],
  controllers:[ DriveController ],
  providers:[ DriveService, Logger ],
})
export class DriveModule{
}

