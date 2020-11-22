import { Injectable } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Drive } from '../schemas/drive.schema';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateDriveDto } from '../dto/create-drive.dto';
import { UpdateDriveDto } from '../dto/update-drive.dto';

@Injectable()
export class DriveDao {

  constructor(@InjectModel(Drive.name) private readonly _driveModel: Model<Drive>) {
  }

  find(): Observable<Drive[] | void> {
    return from(this._driveModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(id: string): Observable<Drive | void> {
    return from(this._driveModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  findMultipleByBeginCityName(city: string): Observable<Drive[] | void> {
    return from(this._driveModel.find({'start.city': city}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findMultipleByEndCityName(city: string): Observable<Drive[] | void> {
    return from(this._driveModel.find({'finish.city': city}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  save(drive: CreateDriveDto): Observable<Drive> {
    return from(new this._driveModel(drive).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  findByIdAndUpdate(id: string, drive: UpdateDriveDto): Observable<Drive | void> {
    return from(this._driveModel.findByIdAndUpdate(id, drive, { new: true, runValidators: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  findByIdAndRemove(id: string): Observable<Drive | void> {
    return from(this._driveModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

}
