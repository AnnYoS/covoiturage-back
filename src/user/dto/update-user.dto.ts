import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto{

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly firstname?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly lastname?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly age?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('FR')
  readonly phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly mail?: string;
}
