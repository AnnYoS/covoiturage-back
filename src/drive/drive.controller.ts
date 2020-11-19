import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Drive } from './interface/drive.interface';
import { DRIVE } from '../data/drive';
import { DriveService } from './drive.service';
import { DriveInterceptor } from './interceptor/drive.interceptor';

@Controller('drive')
@UseInterceptors(DriveInterceptor)
export class DriveController{

  constructor(private readonly _driveService: DriveService) {
  }

  @Get()
  findAll():Observable<Drive[] | void>{
    return this._driveService.findAll();
  }
}
