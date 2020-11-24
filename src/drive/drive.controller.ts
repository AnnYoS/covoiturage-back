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
import {
  ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiParam, ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserEntity } from '../user/entity/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@ApiTags('Drive')
@Controller('drive')
@UseInterceptors(DriveInterceptor)
export class DriveController{

  constructor(private readonly _driveService: DriveService) {
  }

  @ApiOkResponse({description:'Return an array of drive', type: DriveEntity, isArray: true})
  @ApiNoContentResponse({description: 'No drive exists in database'})
  @Get()
  findAll():Observable<Drive[] | void>{
    return this._driveService.findAll();
  }

  @ApiOkResponse({ description: 'Returns the drive for the given "id"', type: DriveEntity })
  @ApiNotFoundResponse({ description: 'Drive with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the drive in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() param: HandlerDriveIdParam): Observable<DriveEntity> {
    return this._driveService.findOne(param.id);
  }

  @ApiOkResponse({ description: 'Returns drives who begin in the "cityname"', type: DriveEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Drives who begin in "cityname" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'cityname',
    description: 'begin city of drives in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('/begin/:cityname')
  findMultipleBeginByCityName(@Param() param: HandlerCitynameParam): Observable<DriveEntity[] | void> {
    return this._driveService.findMultipleBeginByCityName(param.cityname);
  }

  @ApiOkResponse({ description: 'Returns drives who end in the "cityname"', type: DriveEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Drives who end in "cityname" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'cityname',
    description: 'end city of drives in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('/end/:cityname')
  findMultipleEndByCityName(@Param() param: HandlerCitynameParam): Observable<DriveEntity[] | void> {
    return this._driveService.findMultipleEndByCityName(param.cityname);
  }

  @ApiCreatedResponse({ description: 'The drive has been successfully created', type: DriveEntity })
  @ApiConflictResponse({ description: 'The drive already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiBody({ description: 'Payload to create a new drive', type: CreateDriveDto })
  @Post()
  create(@Body() createDriveDto: CreateDriveDto): Observable<DriveEntity> {
    return this._driveService.create(createDriveDto);
  }

  @ApiOkResponse({ description: 'The drive has been successfully updated', type: DriveEntity })
  @ApiNotFoundResponse({ description: 'Drive with the given "id" doesn\'t exist in the database' })
  @ApiConflictResponse({ description: 'The drive already exists in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the drive in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a drive', type: UpdateDriveDto })
  @Put(':id')
  update(@Param() param: HandlerDriveIdParam, @Body() updatePersonDto: UpdateDriveDto): Observable<DriveEntity> {
    return this._driveService.update(param.id, updatePersonDto);
  }

  @ApiNoContentResponse({ description: 'The drive has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Drive with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the drive in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() param: HandlerDriveIdParam): Observable<void> {
    return this._driveService.delete(param.id);
  }
}
