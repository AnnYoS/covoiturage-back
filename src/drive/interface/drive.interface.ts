export interface Drive{
  id: string;
  driver: string;  //it's the id of a user
  clients: string;  //it's the id of a user
  start: Address;
  finish: Address;
  duration: number;
  price: number;
  date: string;
}

export class Address{
  street: string;
  postalCode: string;
  city: string;
}
