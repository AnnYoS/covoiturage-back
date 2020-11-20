import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserEntity{

  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  firstname: string;

  @Expose()
  @Type(() => String)
  lastname: string;

  @Expose()
  @Type(() => Number)
  age: number;

  @Expose()
  @Type(() => String)
  phone: string;

  @Expose()
  @Type(() => String)
  mail: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
