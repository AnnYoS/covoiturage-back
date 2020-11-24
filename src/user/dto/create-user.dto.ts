import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{

  @ApiProperty({ name: 'firstname', description: 'firstname of the user', example: 'Yoann' })
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ name: 'lastname', description: 'lastname of the user', example: 'Simon' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ name: 'photo', description: 'photo of the user', example: 'https://randomuser.me/api/portraits/lego/1.jpg' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly photo: string;

  @ApiProperty({ name: 'age', description: 'age of the user', example: 23 })
  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @ApiProperty({ name: 'phone', description: 'phone number of the user', example: '0634258496' })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty({ name: 'mail', description: 'email of the user', example: 's.yoann@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
}
