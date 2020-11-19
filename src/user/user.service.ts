import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { USER } from '../data/user';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService{

  private _users: User[];

  constructor() {
    this._users = [].concat(USER).map(person => Object.assign(person));
  }

  findAll(): Observable<User[] | void>{
    return of(this._users)
      .pipe(
        map(_ => (!!_ && !!_.length) ? _ : undefined),
      );
  }
}
