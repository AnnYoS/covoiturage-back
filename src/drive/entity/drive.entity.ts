import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DriveAddressEntity } from './drive-address.entity';

@Exclude()
export class DriveEntity{

  @ApiProperty({ name: 'id', description: 'id of the drive', example: '5d5g5shfhfs464d6h6fd4' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'drive', description: 'id of the driver', example: '5d5g5shs4sf64fhfs6h6fd4' })
  @Expose()
  @Type(() => String)
  driver: string;

  @ApiProperty({ name: 'client', description: 'id of client of the drive', example: 'sdh5fd5d4d5ss4f5s5sg4sd5gs' })
  @Expose()
  @Type(() => String)
  clients: string;

  @ApiProperty({ name: 'start', description: 'address of the beginning of the drive' })
  @Expose()
  @Type(() => DriveAddressEntity)
  start: DriveAddressEntity;

  @ApiProperty({ name: 'finish', description: 'address of the finish of the drive' })
  @Expose()
  @Type(() => DriveAddressEntity)
  finish: DriveAddressEntity;

  @ApiProperty({ name: 'duration', description: 'duration of the drive (in minutes)', example: 45 })
  @Expose()
  @Type(() => Number)
  duration: number;

  @ApiProperty({ name: 'price', description: 'price of the drive (in euros)', example: 20.0 })
  @Expose()
  @Type(() => Number)
  price: number;

  @ApiProperty({ name: 'date', description: 'date of the drive', example: '01/01/2021' })
  @Expose()
  @Type(() => String)
  date: string;

  constructor(partial: Partial<DriveEntity>) {
    Object.assign(this, partial);
  }
}
