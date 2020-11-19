import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from './interface/user.interface';
import { USER } from '../data/user';

@Controller('user')
export class UserController{

  @Get()
  findAll():Observable<User[]>{
    return of(USER);
  }
}
