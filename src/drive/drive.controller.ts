import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Drive } from './interface/drive.interface';
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

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Drive> {
    return this._driveService.findOne(id);
  }
}
