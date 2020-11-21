import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { User } from './interface/user.interface';
import { USER } from '../data/user';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, find, findIndex, map, mergeMap, tap } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDao } from './dao/user.dao';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService{

  private _users: User[];

  constructor(private _userDao: UserDao) {
    this._users = [].concat(USER).map(person => Object.assign(person));
  }

  findAll(): Observable<UserEntity[] | void>{
    return this._userDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined)
      );
  }

  /* méthode qui marche sans bdd
  findAll(): Observable<User[] | void>{
    return of(this._users)
      .pipe(
        map(_ => (!!_ && !!_.length) ? _ : undefined),
      );
  }
  */

  findOneById(id: string): Observable<UserEntity> {
    return this._userDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  /* méthode qui marche sans bdd
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
   */

  /* la méthode mongoose pour trouver par nom (ou prénom/nom) n'existe pas, à voir comment l'ajouter
  findMultipleByName(name: string): Observable<UserEntity[]>{
    return this._userDao.findByName()
      .pipe(
        map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined)
      );
  }
   */

  // méthode qui marche sans bdd (?)
  findMultipleByName(name: string): Observable<User> {
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

  create(user: CreateUserDto): Observable<UserEntity> {
    return this._addUser(user)
      .pipe(
        mergeMap(_ => this._userDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`User with lastname '${user.lastname}' and firstname '${user.firstname}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new UserEntity(_)),
      );
  }

  /* méthode qui marche sans bdd
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
   */

  update(id: string, user: UpdateUserDto): Observable<UserEntity> {
    return this._userDao.findByIdAndUpdate(id, user)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`User with lastname '${user.lastname}' and firstname '${user.firstname}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  /* méthode qui marche sans bdd
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
  */

  delete(id: string): Observable<void> {
    return this._userDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  /*
  delete(id: string): Observable<void> {
    return this._findUserIndexOfList(id)
      .pipe(
        tap(_ => this._users.splice(_, 1)),
        map(() => undefined),
      );
  }
  */

  // ça sert à quoi ça ?
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

  private _addUser(user: CreateUserDto): Observable<CreateUserDto> {
    return of(user)
      .pipe(
        map(_ =>
          Object.assign(_, {
            photo: 'https://randomuser.me/api/portraits/lego/6.jpg', //placeholder de photo à utiliser
          }),
        ),
      );
  }

  /*
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
   */

  //ça sert à quoi ça ?
  private _createId(): string {
    return `${new Date().getTime()}`;
  }
}
