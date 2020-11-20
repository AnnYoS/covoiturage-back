import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user.interface';
import { USER } from '../data/user';
import { from, Observable, of, throwError } from 'rxjs';
import { find, first, map, mergeMap, tap } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';

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

  findOneById(id: string): Observable<User> {
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

  findMultipleByName(name: string): Observable<User>{
    return from(this._users)
      .pipe(
        find(_ => _.firstname === name || _.lastname === name),
        mergeMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Users with firstname or lastname '${name}' not found`)),
        ),
      );
  }

  create(person: CreateUserDto): Observable<User> {
    return from(this._users)
      .pipe(
        find(_ => _.lastname.toLowerCase() === person.lastname.toLowerCase() &&
          _.firstname.toLowerCase() === person.firstname.toLowerCase()),
        mergeMap(_ =>
          !!_ ?
            throwError(
              new ConflictException(`People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`),
            ) :
            this._addPerson(person),
        ),
      );
  }

  private _addPerson(person: CreateUserDto): Observable<User> {
    return of(person)
      .pipe(
        map(_ =>
          Object.assign(_) as User,
        ),
        tap(_ => this._users = this._users.concat(_)),
      );
  }
}
