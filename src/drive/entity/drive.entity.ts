import { Exclude, Expose, Type } from 'class-transformer';
import { Adress } from '../interface/drive.interface';
import { DriveAdressEntity } from './drive.adress.entity';

@Exclude()
export class DriveEntity{

  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  driver: string;

  @Expose()
  @Type(() => Array)
  clients: string[];

  @Expose()
  @Type(() => DriveAdressEntity)
  start: Adress;

  @Expose()
  @Type(() => DriveAdressEntity)
  finish: Adress;

  @Expose()
  @Type(() => Number)
  duration: number;

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => DriveAdressEntity)
  stops: Adress[];

  @Expose()
  @Type(() => Number)
  nbSeats: number;

  @Expose()
  @Type(() => String)
  date: string;

  constructor(partial: Partial<DriveEntity>) {
    Object.assign(this, partial);
  }
}
