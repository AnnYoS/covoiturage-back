import { DriveAdressDto } from './drive-adress.dto';
import { IsDate, IsInstance, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDriveDto{

  @IsString()
  @IsNotEmpty()
  readonly driver: string;

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
  readonly nbseats: number;

  @IsDate()
  @IsNotEmpty()
  readonly date: string;
}
