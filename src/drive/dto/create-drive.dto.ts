import { DriveAdressDto } from './drive-adress.dto';
import {
  IsArray,
  IsDate,
  IsInstance,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDriveDto{

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  readonly driver: string;

  @IsMongoId()
  @IsArray()
  @IsString()
  readonly clients: string[];

  @IsInstance(DriveAdressDto)
  @ValidateNested()
  @Type(() => DriveAdressDto)
  @IsNotEmpty()
  readonly start: DriveAdressDto;

  @IsInstance(DriveAdressDto)
  @ValidateNested()
  @Type(() => DriveAdressDto)
  @IsNotEmpty()
  readonly finish: DriveAdressDto;

  @IsNumber()
  readonly duration: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsInstance(DriveAdressDto)
  @ValidateNested()
  @Type(() => DriveAdressDto)
  readonly stops: DriveAdressDto[];

  @IsNumber()
  readonly nbSeats: number;

  @IsDate()
  @IsNotEmpty()
  readonly date: string;
}
