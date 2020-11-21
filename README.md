# Back équivalent à la step 11:

Il est possible de faire:
- methode get http://localhost:3000/drive pour récuperer toutes les courses
- methode get http://localhost:3000/user pour récuperer tout les users du site
- methode get http://localhost:3000/user/id pour recuperer seulement un user par son id
- methode get http://.../user/fname/id pour trouver les users de nom ou prenom "id"
- methode get http://.../drive/begin/city pour savoir les courses débutant dans la ville "city"
- methode get http://.../drive/end/city pour savoir les courses finissant dans la ville "city"
- methode get http://.../drive/id pour faire de meme avec les courses qui existe
- methode get http://.../drive/city pour rechercher les courses partant ou arrivant à "city"
- methode post l'ajout de nouveau user normalement fonctionnel, le mail ne dois pas deja exister, sinon ca n'ajoute pas
- methode post l'ajout de nouvelle course, de meme, le conducteur, les villes de départ et d'arrivée, le prix sont obligatoires, sinon ca n'ajoute pas
- methode put http://.../drive/id pour modifier une course, on ne peux pas modifier le conducteur.
- methode put http://.../user/id pour modifier un user, le mail peut etre modifier mais doit etre unique
- methode delete http://.../user/id pour supprimer un user
- methode delete http://.../drive/id pour supprimer une course

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
- nbSeats: number;
- date: string;
 
 
### Adress:
- street: string;
- postalCode: string;
- city: string;

## 21/11/2020

J'ai ajouté les schémas pour mongoose de User et Drive.  
J'ai aussi créé deux scripts js pour la base de données mongo que j'ai placé dans le dossier script-db :
* createTable.js : créé la table covoiturage et y insère un utilisateur et un trajet
* deleteTable.js : supprime la table covoiturage

Prérequis : il faut que le service mongodb soit en route, personnellement j'utilise homebrew alors je fais `$ brew services start mongodb-community@4.4`.  

J'ai ajouté les dépendances Mongoose ainsi que mis à jour le fichier de config pour pointer vers le `mongodb://0.0.0.0:27017/covoiturage`

Incertitudes :
* J'ai rajouté des @IsArray() dans les dtos pour les attributs tableau
* J'ai déclaré les attributs comme string quand ils sont des tableaux de string (ou de Adress) dans le schéma des trajets
