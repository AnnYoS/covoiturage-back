import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Drive } from './interface/drive.interface';
import { DRIVE } from '../data/drive';
import { from, Observable, of, throwError } from 'rxjs';
import { find, map, mergeMap, tap } from 'rxjs/operators';
import { CreateDriveDto } from './dto/create-drive.dto';

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

  findMultipleBeginByCityName(city: string): Observable<Drive> {
    return from(this._drives)
      .pipe(
        find(_ => _.start.city === city),
        mergeMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Drive with beginning in '${city}' not found`)),
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
            throwError(new NotFoundException(`Drive with finishing in '${city}' not found`)),
        ),
      );
  }

  create(drive: CreateDriveDto): Observable<Drive> {
    return from(this._drives)
      .pipe(
        find(_ => _.id.toLowerCase() === drive.id.toLowerCase()),
        mergeMap(_ =>
          !!_ ?
            throwError(
              new ConflictException(`Drive with id '${drive.id}' already exists`),
            ) :
            this._addPerson(drive),
        ),
      );
  }

  private _addPerson(drive: CreateDriveDto): Observable<Drive> {
    return of(drive)
      .pipe(
        map(_ =>
          Object.assign(_, {
            birthDate: this._parseDate(drive.date),
          }) as Drive,
        ),
        tap(_ => this._drives = this._drives.concat(_)),
      );
  }

  private _parseDate(date: string): number {
    const dates = date.split('/');
    return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
  }
}
