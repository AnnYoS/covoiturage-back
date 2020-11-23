import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly photo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsNotEmpty()
  @IsPhoneNumber('FR')
  readonly phone: string;

  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
}
