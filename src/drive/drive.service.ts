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

  findMultipleBeginByCityName(city: string): Observable<DriveEntity[] | void> {
    return this._driveDao.findMultipleByBeginCityName(city)
      .pipe(
        map(_ => !!_ ? _.map(__ => new DriveEntity(__)) : undefined),
      );
  }

  findMultipleEndByCityName(city: string): Observable<DriveEntity[] | void> {
    return this._driveDao.findMultipleByEndCityName(city)
      .pipe(
        map(_ => !!_ ? _.map(__ => new DriveEntity(__)) : undefined),
      );
  }

  findBeginEndCityName(begincity: string, endcity: string): Observable<DriveEntity[] | void>{
    return this._driveDao.findBeginEndCityName(begincity, endcity)
      .pipe(
        map(_ => !!_ ? _.map(__ => new DriveEntity(__)) : undefined),
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

  private _addDrive(drive: CreateDriveDto): Observable<CreateDriveDto> {
    return of(drive)
      .pipe(
        map(_ =>
          Object.assign(_, {
            date: this._parseDate(drive.date), //placeholder pour la date
          }),
        ),
      );
  }

  private _parseDate(date: string): number {
    const dates = date.split('/');
    return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
  }
}
