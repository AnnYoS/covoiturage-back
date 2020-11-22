import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class HandlerUserIdParam{
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  id: string;
}

export class HandlerNameParam{
  @IsNotEmpty()
  @IsString()
  name: string;
}
