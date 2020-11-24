import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto{

  @ApiProperty({ name: 'firstname', description: 'firstname of the user', example: 'Yoann' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly firstname?: string;

  @ApiProperty({ name: 'lastname', description: 'lastname of the user', example: 'Simon' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly lastname?: string;

  @ApiProperty({ name: 'photo', description: 'photo of the user', example: 'https://randomuser.me/api/portraits/lego/1.jpg' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly photo?: string;

  @ApiProperty({ name: 'age', description: 'age of the user', example: 23 })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly age?: number;

  @ApiProperty({ name: 'phone', description: 'phone number of the user', example: '0634258496' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly phone?: string;

  @ApiProperty({ name: 'mail', description: 'email of the user', example: 's.yoann@mail.com' })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly mail?: string;
}
