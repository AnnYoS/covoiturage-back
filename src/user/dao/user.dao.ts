import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserDao {

  constructor(@InjectModel(User.name) private readonly _userModel: Model<User>) {
  }

  find(): Observable<User[] | void> {
    return from(this._userModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(id: string): Observable<User | void> {
    return from(this._userModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  findByName(name: string): Observable<User[] | void> {
    return from(this._userModel.find({'firstname': name, 'lastname': name} ))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  save(user: CreateUserDto): Observable<User> {
    return from(new this._userModel(user).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  findByIdAndUpdate(id: string, user: UpdateUserDto): Observable<User | void> {
    return from(this._userModel.findByIdAndUpdate(id, user, { new: true, runValidators: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  findByIdAndRemove(id: string): Observable<User | void> {
    return from(this._userModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

}
