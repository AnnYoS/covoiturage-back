import { DriveAddressDto } from './drive-address.dto';
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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriveDto{

  @ApiProperty({ name: 'drive', description: 'id of the driver', example: '5d5g5shs4sf64fhfs6h6fd4' })
  @IsMongoId()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly driver?: string;

  @ApiProperty({ name: 'client', description: 'id of client of the drive', example: 'sdh5fd5d4d5ss4f5s5sg4sd5gs' })
  @IsMongoId()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly client?: string;

  @ApiProperty({ name: 'start', description: 'address of the beginning of the drive' })
  @IsInstance(DriveAddressDto)
  @ValidateNested({each: true})
  @IsOptional()
  @Type(() => DriveAddressDto)
  readonly start?: DriveAddressDto;

  @ApiProperty({ name: 'finish', description: 'address of the finish of the drive' })
  @IsInstance(DriveAddressDto)
  @ValidateNested({each: true})
  @IsOptional()
  @Type(() => DriveAddressDto)
  readonly finish?: DriveAddressDto;

  @ApiProperty({ name: 'duration', description: 'duration of the drive (in minutes)', example: 45 })
  @IsNumber()
  @IsOptional()
  readonly duration?: number;

  @ApiProperty({ name: 'price', description: 'price of the drive (in euros)', example: 20.0 })
  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @ApiProperty({ name: 'date', description: 'date of the drive', example: '01/01/2021' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly date?: string;
}
