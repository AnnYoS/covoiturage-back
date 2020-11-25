# Back-End projet Nouvelles Technologies du Web

par Nicolas KLEINHENTZ et Yoann SIMON

## Installation

ouvrir un terminal

Récupération du projet sur git:
- git clone https://github.com/AnnYo/covoiturage-back.git

Installation des dépendances (yarn ou npm suivant ce que vous avez)
- npm install
- yarn install


Ensuite, lancer MongoDB sur votre machine puis dans Robo3T, se connecter à Mongo, crée une base de données "covoiturage", et executer le script "initTable.js" présent dans le dossier /covoiturage-back/script-DB.

(Il existe un script deleteTable.js pour supprimer la table)

Il ne reste plus qu'a lancer le projet en étant dans le dossier /covoiturage-back dans le terminal puis faire la commande:
- nest start

Vous avez alors lancé le projet back, il ne reste plus qu'a aller dans votre navigateur et aller a l'adresse localhost:3000/documentation pour avoir accès à la documentation.
