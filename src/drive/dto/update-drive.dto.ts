import { DriveAdressDto } from './drive-adress.dto';
import {
  IsArray,
  IsDateString,
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
  @ValidateNested({each: true})
  @IsOptional()
  @IsArray()
  @Type(() => DriveAdressDto)
  readonly start?: DriveAdressDto;

  @IsInstance(DriveAdressDto)
  @ValidateNested({each: true})
  @IsOptional()
  @IsArray()
  @Type(() => DriveAdressDto)
  readonly finish?: DriveAdressDto;

  @IsNumber()
  @IsOptional()
  readonly duration?: number;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => DriveAdressDto)
  readonly stops?: DriveAdressDto[];

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly nbSeats?: number;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  readonly date?: string;
}
