import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserInterceptor } from './interceptor/user.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HandlerNameParam, HandlerUserIdParam } from './validator/handler-user-params';
import { UserEntity } from './entity/user.entity';
import {
  ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiParam,
  ApiTags, ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(UserInterceptor)
export class UserController{

  constructor(private readonly _userService: UserService) {
  }

  @ApiOkResponse({description:'Return an array of user', type: UserEntity, isArray: true})
  @ApiNoContentResponse({description: 'No user exists in database'})
  @Get()
  findAll():Observable<UserEntity[] | void>{
    return this._userService.findAll();
  }

  @ApiOkResponse({ description: 'Returns the user for the given "id"', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOneById(@Param() param: HandlerUserIdParam): Observable<UserEntity> {
    return this._userService.findOneById(param.id);
  }

  @ApiOkResponse({ description: 'Returns users for the given "firstname" or "lastname"', type: UserEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Users with the given "firstname" or "lastname" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'name',
    description: '"firstname" or "lastname" of users in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('/fname/:name')
  findMultipleByName(@Param() param: HandlerNameParam): Observable<UserEntity[] | void>{
    return this._userService.findMultipleByName(param.name);
  }

  @ApiCreatedResponse({ description: 'The user has been successfully created', type: UserEntity })
  @ApiConflictResponse({ description: 'The user already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiBody({ description: 'Payload to create a new user', type: CreateUserDto })
  @Post()
  create(@Body() createPersonDto: CreateUserDto): Observable<UserEntity> {
    return this._userService.create(createPersonDto);
  }

  @ApiOkResponse({ description: 'The user has been successfully updated', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
  @ApiConflictResponse({ description: 'The user already exists in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a user', type: UpdateUserDto })
  @Put(':id')
  update(@Param() param: HandlerUserIdParam, @Body() updatePersonDto: UpdateUserDto): Observable<UserEntity> {
    return this._userService.update(param.id, updatePersonDto);
  }

  @ApiNoContentResponse({ description: 'The user has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() param: HandlerUserIdParam): Observable<void> {
    return this._userService.delete(param.id);
  }
}
