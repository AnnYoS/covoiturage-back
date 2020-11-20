import { Adress } from '../interface/drive.interface';
import { DriveAdressDto } from './drive-adress.dto';

export class CreateDriveDto{
  readonly id: string;
  readonly driver: string;
  readonly clients?: string[];
  readonly start: DriveAdressDto;
  readonly finish: DriveAdressDto;
  readonly duration?: number;
  readonly price: number;
  readonly stops?: DriveAdressDto[];
  readonly nbseats: number;
  readonly date: string;
}