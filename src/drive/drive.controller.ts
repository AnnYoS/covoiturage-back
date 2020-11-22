import { Body, Controller, Delete, Get, Header, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Drive } from './interface/drive.interface';
import { DriveService } from './drive.service';
import { DriveInterceptor } from './interceptor/drive.interceptor';
import { CreateDriveDto } from './dto/create-drive.dto';
import { UpdateDriveDto } from './dto/update-drive.dto';
import {
  HandlerCitynameParam,
  HandlerDriveIdParam,
} from './validator/handler-drive-params';
import { DriveEntity } from './entity/drive.entity';

@Controller('drive')
@UseInterceptors(DriveInterceptor)
export class DriveController{

  constructor(private readonly _driveService: DriveService) {
  }

  @Get()
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  findAll():Observable<Drive[] | void>{
    return this._driveService.findAll();
  }

  @Get(':id')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  findOne(@Param() param: HandlerDriveIdParam): Observable<DriveEntity> {
    return this._driveService.findOne(param.id);
  }

  @Get('/begin/:cityname')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  findMultipleBeginByCityName(@Param() param: HandlerCitynameParam): Observable<DriveEntity[] | void> {
    return this._driveService.findMultipleBeginByCityName(param.cityname);
  }

  @Get('/end/:cityname')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  findMultipleEndByCityName(@Param() param: HandlerCitynameParam): Observable<DriveEntity[] | void> {
    return this._driveService.findMultipleEndByCityName(param.cityname);
  }

  @Post()
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  create(@Body() createDriveDto: CreateDriveDto): Observable<DriveEntity> {
    return this._driveService.create(createDriveDto);
  }

  @Put(':id')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  update(@Param() param: HandlerDriveIdParam, @Body() updatePersonDto: UpdateDriveDto): Observable<DriveEntity> {
    return this._driveService.update(param.id, updatePersonDto);
  }

  @Delete(':id')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  delete(@Param() param: HandlerDriveIdParam): Observable<void> {
    return this._driveService.delete(param.id);
  }
}
