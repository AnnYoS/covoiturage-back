import { IsNotEmpty, IsString } from 'class-validator';

export class HandlerDriveIdParam{
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class HandlerCitynameParam{
  @IsNotEmpty()
  @IsString()
  cityname: string;
}
