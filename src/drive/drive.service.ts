import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Drive } from './interface/drive.interface';
import { DRIVE } from '../data/drive';
import { from, Observable, of, throwError } from 'rxjs';
import { find, findIndex, map, mergeMap, tap } from 'rxjs/operators';
import { CreateDriveDto } from './dto/create-drive.dto';
import { UpdateDriveDto } from './dto/update-drive.dto';

@Injectable()
export class DriveService{

  private _drives: Drive[];

  constructor() {
    this._drives = [].concat(DRIVE).map(drive => Object.assign(drive, {
      date: this._parseDate(drive.date)
    }))
  }

  findAll(): Observable<Drive[] | void> {
    return of(this._drives)
      .pipe(
        map(_ => (!!_ && !!_.length) ? _ : undefined),
      );
  }

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

  create(drive: CreateDriveDto): Observable<Drive> {
    return this._addDrive(drive);
  }

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

  delete(id: string): Observable<void> {
    return this._findDriveIndexOfList(id)
      .pipe(
        tap(_ => this._drives.splice(_, 1)),
        map(() => undefined),
      );
  }

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

  private _createId(): string {
    return `${new Date().getTime()}`;
  }
}
