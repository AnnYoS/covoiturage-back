import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Drive } from './interface/drive.interface';
import { DRIVE } from '../data/drive';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, find, findIndex, map, mergeMap, tap } from 'rxjs/operators';
import { CreateDriveDto } from './dto/create-drive.dto';
import { UpdateDriveDto } from './dto/update-drive.dto';
import { DriveEntity } from './entity/drive.entity';
import { DriveDao } from './dao/drive.dao';

@Injectable()
export class DriveService{

  private _drives: Drive[];

  constructor(private _driveDao: DriveDao) {
    this._drives = [].concat(DRIVE).map(drive => Object.assign(drive, {
      date: this._parseDate(drive.date)
    }))
  }

  findAll(): Observable<DriveEntity[] | void> {
    return this._driveDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new DriveEntity(__)) : undefined),
      );
  }

  /* méthode qui marche sans bdd
  findAll(): Observable<Drive[] | void> {
    return of(this._drives)
      .pipe(
        map(_ => (!!_ && !!_.length) ? _ : undefined),
      );
  }
  */

  findOne(id: string): Observable<DriveEntity> {
    return this._driveDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new DriveEntity(_)) :
            throwError(new NotFoundException(`Drive with id '${id}' not found`)),
        ),
      );
  }

  /* méthode qui marche sans bdd
  findOne(id: string): Observable<Drive> {
    return from(this._drives)
      .pipe(
        find(_ => _.id === id),
        mergeMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Drive with id '${id}' not found`)),
        ),
      );
  }
  */

  // méthode qui marche sans bdd
  findMultipleByCityName(city: string): Observable<Drive> {
    return from(this._drives)
      .pipe(
        find(_ => _.start.city === city || _.finish.city === city),
        mergeMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Drive with start in '${city}' not found`)),
        ),
      );
  }

  // méthode qui marche sans bdd
  findMultipleBeginByCityName(city: string): Observable<Drive> {
    return from(this._drives)
      .pipe(
        find(_ => _.start.city === city),
        mergeMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Drive with start in '${city}' not found`)),
        ),
      );
  }

  // méthode qui marche sans bdd
  findMultipleEndByCityName(city: string): Observable<Drive> {
    return from(this._drives)
      .pipe(
        find(_ => _.finish.city === city),
        mergeMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Drive with finish in '${city}' not found`)),
        ),
      );
  }

  create(drive: CreateDriveDto): Observable<DriveEntity> {
    return this._addDrive(drive)
      .pipe(
        mergeMap(_ => this._driveDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Drive already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new DriveEntity(_)),
      );
  }

  /* méthode qui marche sans bdd
  create(drive: CreateDriveDto): Observable<Drive> {
    return this._addDrive(drive);
  }
   */

  update(id: string, drive: UpdateDriveDto): Observable<DriveEntity> {
    return this._driveDao.findByIdAndUpdate(id, drive)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Drive already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new DriveEntity(_)) :
            throwError(new NotFoundException(`Drive with id '${id}' not found`)),
        ),
      );
  }

  /* méthode qui marche sans bdd
  update(id: string, drive: UpdateDriveDto): Observable<Drive> {
    return from(this._drives)
      .pipe(
        find(_ => _.driver.toLowerCase() === drive.driver.toLowerCase()),
        mergeMap(_ =>
          !!_ ?
            throwError(
              new ConflictException(`Cannot change the driver`),
            ) :
            this._findDriveIndexOfList(id),
        ),
        tap(_ => Object.assign(this._drives[ _ ], drive)),
        map(_ => this._drives[ _ ]),
      );
  }
   */

  delete(id: string): Observable<void> {
    return this._driveDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Drive with id '${id}' not found`)),
        ),
      );
  }

  /* méthode qui marche sans bdd
  delete(id: string): Observable<void> {
    return this._findDriveIndexOfList(id)
      .pipe(
        tap(_ => this._drives.splice(_, 1)),
        map(() => undefined),
      );
  }
   */

  private _addDrive(drive: CreateDriveDto): Observable<CreateDriveDto> {
    return of(drive)
      .pipe(
        map(_ =>
          Object.assign(_, {
            date: this._parseDate('20/09/1991'), //placeholder pour la date
          }),
        ),
      );
  }

  /*
  private _addDrive(drive: CreateDriveDto): Observable<Drive> {
    return of(drive)
      .pipe(
        map(_ =>
          Object.assign(_, {
            id: this._createId(),
            date: this._parseDate(drive.date),
          }) as Drive,
        ),
        tap(_ => this._drives = this._drives.concat(_)),
      );
  }
   */

  // ça sert à quoi ça ?
  private _findDriveIndexOfList(id: string): Observable<number> {
    return from(this._drives)
      .pipe(
        findIndex(_ => _.id === id),
        mergeMap(_ => _ > -1 ?
          of(_) :
          throwError(new NotFoundException(`Drive with id '${id}' not found`)),
        ),
      );
  }

  private _parseDate(date: string): number {
    const dates = date.split('/');
    return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
  }

  // ça sert à quoi ?
  private _createId(): string {
    return `${new Date().getTime()}`;
  }
}
