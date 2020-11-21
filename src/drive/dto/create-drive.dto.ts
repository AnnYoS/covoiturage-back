import { DriveAdressDto } from './drive-adress.dto';
import {
  IsArray,
  IsDateString,
  IsInstance,
  IsMongoId,
  IsNotEmpty,
  IsNumber, IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDriveDto{

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  readonly driver: string;

  @IsArray()
  @IsOptional()
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

  @ValidateNested({each: true})
  @IsOptional()
  @IsArray()
  @Type(() => DriveAdressDto)
  readonly stops: DriveAdressDto[];

  @IsNumber()
  readonly nbSeats: number;

  @IsDateString()
  @IsNotEmpty()
  readonly date: string;
}
