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

  constructor(private readonly _userDao: UserDao) {
  }

  findAll(): Observable<UserEntity[] | void>{
    return this._userDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined)
      );
  }

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

  findMultipleByName(name: string): Observable<UserEntity[] | void>{
    return this._userDao.findByName(name)
      .pipe(
        map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined)
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
}
