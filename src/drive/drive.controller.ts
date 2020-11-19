import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Drive } from './interface/drive.interface';
import { DRIVE } from '../data/drive';

@Controller('drive')
export class DriveController{

  @Get()
  findAll():Observable<Drive[]>{
    return of(DRIVE);
  }
}
