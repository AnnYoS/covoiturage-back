import { Module } from '@nestjs/common';
import { DriveController } from './drive.controller';

@Module({
  controllers:[ DriveController ],
})
export class DriveModule{}
