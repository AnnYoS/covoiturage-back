import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Drive } from './interface/drive.interface';
import { DriveService } from './drive.service';
import { DriveInterceptor } from './interceptor/drive.interceptor';
import { CreateDriveDto } from './dto/create-drive.dto';
import { UpdateDriveDto } from './dto/update-drive.dto';

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

  @Get(':cityname')
  findMultipleByCityName(@Param('cityname')city: string): Observable<Drive> {
    return this._driveService.findMultipleByCityName(city);
  }

  @Get('/begin/:cityname')
  findMultipleBeginByCityName(@Param('cityname')city: string): Observable<Drive> {
    return this._driveService.findMultipleBeginByCityName(city);
  }

  @Get('/end/:cityname')
  findMultipleEndByCityName(@Param('cityname')city: string): Observable<Drive> {
    return this._driveService.findMultipleEndByCityName(city);
  }

  @Post()
  create(@Body() createDriveDto: CreateDriveDto): Observable<Drive> {
    return this._driveService.create(createDriveDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdateDriveDto): Observable<Drive> {
    return this._driveService.update(id, updatePersonDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._driveService.delete(id);
  }
}
