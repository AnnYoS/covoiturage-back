import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user.interface';
import { USER } from '../data/user';
import { from, Observable, of, throwError } from 'rxjs';
import { find, map, mergeMap } from 'rxjs/operators';

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

  findOne(id: string): Observable<User> {
    return from(this._users)
      .pipe(
        find(_ => _.id === id),
        mergeMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }
}
