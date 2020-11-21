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

## 20/11/2020

J'ai ajouté les schémas pour mongoose de User et Drive.  
J'ai aussi créé deux scripts js pour la base de données mongo que j'ai placé dans le dossier script-db :
* createTable.js : créé la table covoiturage et y insère un utilisateur et un trajet
* deleteTable.js : supprime la table covoiturage

Prérequis : il faut que le service mongodb soit en route, personnellement j'utilise homebrew alors je fais `$ brew services start mongodb-community@4.4`.  

J'ai ajouté les dépendances Mongoose ainsi que mis à jour le fichier de config pour pointer vers le `mongodb://0.0.0.0:27017/covoiturage`

DAOs crées et remplis mais à coup de copié collé donc à vérifier et à tester.

Incertitudes :
* J'ai rajouté des @IsArray() dans les dtos pour les attributs tableau
* J'ai déclaré les attributs comme string quand ils sont des tableaux de string (ou de Adress) dans le schéma des trajets

## 21/11/2020

Ajout d'un readme-mongo.txt pour le lancement du service et la création de la table, le test de celle-ci et sa suppression.

J'ai mis les fonctions qui marchait sans BDD en commentaire pour l'instant, on sais jamais je voulais pas les supprimer.

Pour la bdd, voici les fonctions testées :
* GET tous les users : ok
* POST d'un nouvel user : ok (par contre le num de téléphone ne marche qu'avec +33, 0700000000 ne marchais pas, +33700000000 si)
* PUT d'un utilisateur : ok
* DELETE d'un utilisateur : ok
* GET tous les trajets : ok
* POST d'un nouveau trajet sans clients ni stops : ok
* POST d'un nouvau trajet avec clients et stops : ok
* PUT d'un trajet : ok
* DELETE d'un trajet : ok

J'ai eu quelques problèmes pour la fonction findByName car pour le DAO, les fonctions sont générées par Mongoose (genre findById) par rapport aux schémas j'imagine, mais findByName() n'existe pas (findByFirstname() non plus d'ailleurs), alors à voir si pas possible en BDD (j'en doute) ou comment ajouter ça. Pareil pour les méthodes du même type dans drive.

J'ai mis la date d'une drive en IsDateString() pour réutiliser le format de dates de mongo (ex. 1999-12-31T23:00:00.000Z).
J'ai aussi mis les clients en IsOptional() pour la création et la mise à jour vu qu'il n'y a pas forcément de client lors de la création d'un trajet. Pareil pour les stops.
J'ai aussi mis du coup les champs des stops en non requis si on ne veux pas mettre d'arrêts e ncréant le trajet (l'idée des arrêts c'est de les mettre en fonction de où veulent être déposés les gens).
