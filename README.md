# Back équivalent à la step 10:

Il est possible de faire:
- methode get http://localhost:3000/drive pour récuperer toutes les courses
- methode get http://localhost:3000/user pour récuperer tout les users du site
- methode get http://localhost:3000/user/id pour recuperer seulement un user par son id
- methode get http://.../user/fname/id pour trouver les users de nom ou prenom "id"
- methode get http://.../drive/begin/city pour savoir les courses débutant dans la ville "city"
- methode get http://.../drive/end/city pour savoir les courses finissant dans la ville "city"
- methode get http://.../drive/id pour faire de meme avec les courses qui existe
- methode post l'ajout de nouveau user normalement fonctionnel, le mail ne dois pas deja exister, sinon ca n'ajoute pas
- methode post l'ajout de nouvelle course, de meme, le conducteur, les villes de départ et d'arrivée, le prix sont obligatoires, sinon ca n'ajoute pas
- methode put http://.../drive/id pour modifier une course, on ne peux pas modifier le conducteur.
- methode put http://.../user/id pour modifier un user, le mail peut etre modifier mais doit etre unique

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
