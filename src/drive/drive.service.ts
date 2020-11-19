import { Injectable } from '@nestjs/common';
import { Drive } from './interface/drive.interface';
import { DRIVE } from '../data/drive';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  private _parseDate(date: string): number {
    const dates = date.split('/');
    return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
  }
}
