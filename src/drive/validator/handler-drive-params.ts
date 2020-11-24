import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class HandlerDriveIdParam{
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  id: string;
}

export class HandlerCitynameParam{
  @IsNotEmpty()
  @IsString()
  cityname: string;
}

export class HandlerCityBeginEndParam{
  @IsNotEmpty()
  @IsString()
  begin: string;

  @IsNotEmpty()
  @IsString()
  end: string;
}
