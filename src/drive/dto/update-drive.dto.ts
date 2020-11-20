import { DriveAdressDto } from './drive-adress.dto';
import { IsDate, IsInstance, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDriveDto{

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly driver?: string;

  @IsOptional()
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
  @Type(() => DriveAdressDto)
  readonly stops?: DriveAdressDto[];

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly nbseats?: number;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  readonly date?: string;
}
