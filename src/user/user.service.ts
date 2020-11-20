import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user.interface';
import { USER } from '../data/user';
import { from, Observable, of, throwError } from 'rxjs';
import { find, findIndex, map, mergeMap, tap } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
        find(_ => _.mail.toLowerCase() === person.mail.toLowerCase()),
        mergeMap(_ =>
          !!_ ?
            throwError(
              new ConflictException(`An account with the mail '${person.mail}' already exists`),
            ) :
            this._addUser(person),
        ),
      );
  }

  update(id: string, user: UpdateUserDto): Observable<User> {
    return from(this._users)
      .pipe(
        find(_ => _.firstname.toLowerCase() !== user.firstname.toLowerCase()
          || user.lastname.toLowerCase() !== _.lastname.toLowerCase() || _.mail.toLowerCase() === user.mail.toLowerCase()),
        mergeMap(_ =>
          !!_ ?
            throwError(
              new ConflictException(`Cannot change the firstname and lastname or the new mail already exists`),
            ) :
            this._findUserIndexOfList(id),
        ),
        tap(_ => Object.assign(this._users[ _ ], user)),
        map(_ => this._users[ _ ]),
      );
  }

  private _findUserIndexOfList(id: string): Observable<number> {
    return from(this._users)
      .pipe(
        findIndex(_ => _.id === id),
        mergeMap(_ => _ > -1 ?
          of(_) :
          throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  private _addUser(person: CreateUserDto): Observable<User> {
    return of(person)
      .pipe(
        map(_ =>
          Object.assign(_, {
            id: this._createId(),
          }) as User,
        ),
        tap(_ => this._users = this._users.concat(_)),
      );
  }

  private _createId(): string {
    return `${new Date().getTime()}`;
  }
}
