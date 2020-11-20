import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from './interface/user.interface';
import { UserInterceptor } from './interceptor/user.interceptor';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
