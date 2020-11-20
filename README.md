# Back équivalent à la step 9:

Il est possible de faire:
- methode get http://localhost:3000/drive pour récuperer toutes les courses
- methode get http://localhost:3000/user pour récuperer tout les users du site
- methode get http://localhost:3000/user/id pour recuperer seulement un user par son id
- methode get http://.../drive/id pour faire de meme avec les courses qui existe
- methode post l'ajout de nouveau user normalement fonctionnel, l'id ne doit pas deja exister, sinon ca n'ajoute pas
- methode post l'ajout de nouvelle course, de meme, l'id doit etre unique, sinon ca n'ajoute pas (a verifier)

## Voila comment j'ai organisé les données:

### User:
- id: string
- firstname: string
- lastname: string
- age: number
- phone: string
- mail: string
 
 
### Drive:
- id: string;
- driver: string;
- clients: string[];
- start: Adress;
- finish: Adress;
- duration: number;
- price: number;
- stops: Adress[];
- nbseats: number;
- date: string;
 
 
### Adress:
- street: string;
- postalCode: string;
- city: string;
