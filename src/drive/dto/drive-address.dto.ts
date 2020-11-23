import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DriveAddressDto {

  @ApiProperty({ name: 'street', description: 'street of the location', example: '8 rue de la Libération' })
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @ApiProperty({ name: 'postalCode', description: 'postal code of te city', example: '54000' })
  @IsString()
  @IsNotEmpty()
  readonly postalCode: string;

  @ApiProperty({ name: 'city', description: 'city of the location', example: 'Nancy' })
  @IsString()
  @IsNotEmpty()
  readonly city: string;
}
