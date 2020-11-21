import { DriveAdressDto } from './drive-adress.dto';
import {
  IsArray,
  IsDate,
  IsInstance,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDriveDto{

  @IsMongoId()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly driver?: string;

  @IsMongoId()
  @IsOptional()
  @IsArray()
  @IsString()
  @IsNotEmpty()
  readonly clients?: string[];

  @IsInstance(DriveAdressDto)
  @ValidateNested()
  @Type(() => DriveAdressDto)
  readonly start?: DriveAdressDto;

  @IsInstance(DriveAdressDto)
  @ValidateNested()
  @Type(() => DriveAdressDto)
  readonly finish?: DriveAdressDto;

  readonly duration?: number;

  readonly price?: number;

  @IsInstance(DriveAdressDto)
  @ValidateNested()
  @IsArray()
  @Type(() => DriveAdressDto)
  readonly stops?: DriveAdressDto[];

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly nbSeats?: number;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  readonly date?: string;
}
