import { IsNotEmpty, IsString } from 'class-validator';

export class HandlerUserIdParam{
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class HandlerNameParam{
  @IsNotEmpty()
  @IsString()
  name: string;
}
