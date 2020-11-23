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

  @ApiProperty({ name: 'clients', description: 'ids of clients of the drive', example: '[5d5g5shfd5sf4fhfs6h6fd4, sdh5fd5d4d5ss4f5s5sg4sd5gs]' })
  @IsMongoId()
  @IsOptional()
  @IsArray()
  @IsString()
  @IsNotEmpty()
  readonly clients?: string[];

  @ApiProperty({ name: 'start', description: 'address of the beginning of the drive' })
  @IsInstance(DriveAddressDto)
  @ValidateNested({each: true})
  @IsOptional()
  @IsArray()
  @Type(() => DriveAddressDto)
  readonly start?: DriveAddressDto;

  @ApiProperty({ name: 'finish', description: 'address of the finish of the drive' })
  @IsInstance(DriveAddressDto)
  @ValidateNested({each: true})
  @IsOptional()
  @IsArray()
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

  @ApiProperty({ name: 'stops', description: 'stops of the drive' })
  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => DriveAddressDto)
  readonly stops?: DriveAddressDto[];

  @ApiProperty({ name: 'nbSeats', description: 'number of seats possible', example: 4 })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly nbSeats?: number;

  @ApiProperty({ name: 'date', description: 'date of the drive', example: '01/01/2021' })
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  readonly date?: string;
}
