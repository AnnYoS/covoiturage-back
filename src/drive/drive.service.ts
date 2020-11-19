import { Injectable, NotFoundException } from '@nestjs/common';
import { Drive } from './interface/drive.interface';
import { DRIVE } from '../data/drive';
import { from, Observable, of, throwError } from 'rxjs';
import { find, map, mergeMap } from 'rxjs/operators';

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

  private _parseDate(date: string): number {
    const dates = date.split('/');
    return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
  }
}
