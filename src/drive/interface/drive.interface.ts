export interface Drive{
  id: string;
  driver: string;  //it's the id of a user
  clients: string[];  //it's the id of a user
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
