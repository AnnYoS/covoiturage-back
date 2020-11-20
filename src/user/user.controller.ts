import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from './interface/user.interface';
import { UserInterceptor } from './interceptor/user.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findOneById(@Param('id') id: string): Observable<User> {
    return this._userService.findOneById(id);
  }

  @Get('/fname/:name')
  findMultipleByName(@Param('name') name: string): Observable<User>{
    return this._userService.findMultipleByName(name);
  }

  @Post()
  create(@Body() createPersonDto: CreateUserDto): Observable<User> {
    return this._userService.create(createPersonDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdateUserDto): Observable<User> {
    return this._userService.update(id, updatePersonDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._userService.delete(id);
  }
}
