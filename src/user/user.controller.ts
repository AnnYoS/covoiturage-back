import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from './interface/user.interface';
import { UserInterceptor } from './interceptor/user.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HandlerNameParam, HandlerUserIdParam } from './validator/handler-user-params';

@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController{

  constructor(private readonly _userService: UserService) {
  }

  @Get()
  findAll():Observable<User[] | void>{
    return this._userService.findAll();
  }

  @Get(':id')
  findOneById(@Param() param: HandlerUserIdParam): Observable<User> {
    return this._userService.findOneById(param.id);
  }

  @Get('/fname/:name')
  findMultipleByName(@Param() param: HandlerNameParam): Observable<User>{
    return this._userService.findMultipleByName(param.name);
  }

  @Post()
  create(@Body() createPersonDto: CreateUserDto): Observable<User> {
    return this._userService.create(createPersonDto);
  }

  @Put(':id')
  update(@Param() param: HandlerUserIdParam, @Body() updatePersonDto: UpdateUserDto): Observable<User> {
    return this._userService.update(param.id, updatePersonDto);
  }

  @Delete(':id')
  delete(@Param() param: HandlerUserIdParam): Observable<void> {
    return this._userService.delete(param.id);
  }
}
