import { Expose, Type } from 'class-transformer';

export class DriveAdressEntity{

  @Expose()
  @Type(() => String)
  street: string;

  @Expose()
  @Type(() => String)
  postalCode: string;

  @Expose()
  @Type(() => String)
  city: string;

  constructor(partial: Partial<DriveAdressEntity>) {
    Object.assign(this, partial);
  }
}
