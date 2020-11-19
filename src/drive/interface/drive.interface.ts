export interface Drive{
  id: string;
  driver: number;
  clients: number[];
  start: Adress;
  finish: Adress;
  duration: number;
  price: number;
  stops: Adress[];
  nbseats: number;
  date: string;
}

export class Adress{
  street: string;
  postalCode: string;
  city: string;
}
