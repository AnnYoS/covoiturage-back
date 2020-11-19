Back équivalent à la step 6:
Il est possible de faire:
- methode get http://localhost:3000/drive pour récuperer toutes les courses
- methode get http://localhost:3000/user pour récuperer tout les users du site

Voila comment j'ai organisé les données:

Users:
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  phone: string;
  mail: string;
 
 
Drive:
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
 
 
 Adress:
  street: string;
  postalCode: string;
  city: string;
