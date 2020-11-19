export const DRIVE = [
  {
    id: '2a4r556ze54az556',
    driver: 1,
    clients: [2, 3],
    start:{
      street: 'rue de Nancy',
      postalCode: '54000',
      city: 'Nancy',
    },
    finish:{
      street: 'rue de Metz',
      postalCode: '57000',
      city: 'Metz',
    },
    duration: 60,
    price: 15.0,
    stops:[
      {
        street: 'rue de la rue',
        postalCode: '69000',
        city: 'Lyon',
      }
    ],
    nbseats: 3,
    date:'10/12/2020',
  },
  {
    id: 'zze32545fdgt5r63',
    driver: 2,
    clients: [4],
    start:{
      street: 'rue de Metz',
      postalCode: '57000',
      city: 'Metz',
    },
    finish:{
      street: 'avenue du Vieux Port',
      postalCode: '13000',
      city: 'Marseille',
    },
    duration: 420,
    price: 50.0,
    stops:[
      {
        street: 'rue de la rue',
        postalCode: '69000',
        city: 'Lyon',
      }
    ],
    nbseats: 1,
    date:'01/01/2021',
  },
  {
    id: 'd6g6g56d5h4fh65d6',
    driver: 5,
    clients: [4, 1, 2],
    start:{
      street: 'avenue du Vieux Port',
      postalCode: '13000',
      city: 'Marseille',
    },
    finish:{
      street: 'avenue des Champs Elysees',
      postalCode: '95000',
      city: 'Paris',
    },
    duration: 300,
    price: 40.0,
    stops:[
      {
        street: 'rue de la rue',
        postalCode: '69000',
        city: 'Lyon',
      },
      {
        street: 'rue de Metz',
        postalCode: '57000',
        city: 'Metz',
      }
    ],
    nbseats: 4,
    date:'01/02/2020',
  },
];
