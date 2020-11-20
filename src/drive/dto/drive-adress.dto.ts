import { IsNotEmpty, IsString } from 'class-validator';

export class DriveAdressDto {

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly postalCode: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;
}
