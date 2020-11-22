import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserEntity{

  @ApiProperty({ name: 'id', description: 'id of the user', example: '5d5g5shfd5sf4fhfs6h6fd4' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'firstname', description: 'firstname of the user', example: 'Yoann' })
  @Expose()
  @Type(() => String)
  firstname: string;

  @ApiProperty({ name: 'lastname', description: 'lastname of the user', example: 'Simon' })
  @Expose()
  @Type(() => String)
  lastname: string;

  @ApiProperty({ name: 'age', description: 'age of the user', example: 23 })
  @Expose()
  @Type(() => Number)
  age: number;

  @ApiProperty({ name: 'phone', description: 'phone number of the user', example: '0634258496' })
  @Expose()
  @Type(() => String)
  phone: string;

  @ApiProperty({ name: 'mail', description: 'email of the user', example: 's.yoann@mail.com' })
  @Expose()
  @Type(() => String)
  mail: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
