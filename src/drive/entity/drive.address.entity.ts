import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DriveAddressEntity{

  @ApiProperty({ name: 'street', description: 'street of the location', example: '8 rue de la Libération' })
  @Expose()
  @Type(() => String)
  street: string;

  @ApiProperty({ name: 'postalCode', description: 'postal code of te city', example: '54000' })
  @Expose()
  @Type(() => String)
  postalCode: string;

  @ApiProperty({ name: 'city', description: 'city of the location', example: 'Nancy' })
  @Expose()
  @Type(() => String)
  city: string;

  constructor(partial: Partial<DriveAddressEntity>) {
    Object.assign(this, partial);
  }
}
