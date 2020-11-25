# Back-End projet Nouvelles Technologies du Web

par Nicolas KLEINHENTZ et Yoann SIMON

## Installation

Ouvrir un terminal.  
Récupération du projet sur git :  
`$ git clone https://github.com/AnnYo/covoiturage-back.git`

Se placer avec le terminal dans le dossier */covoiturage-back*

Installation des dépendances (*yarn* ou *npm* suivant ce que vous avez) :  
`$ npm install` ou `$ yarn install`

Ensuite, lancez MongoDB sur votre machine puis dans Robo3T, se connecter à Mongo, créer une base de données "covoiturage", et exécuter le script *initTable.js* présent dans le dossier */scripts-db*.

(Il existe un script *deleteTable.js* pour supprimer la table)

Lancez le front-end :  
`$ nest start`

Vous avez alors lancé le projet back, il ne reste plus qu'à aller dans votre navigateur et aller à l'adresse localhost:3000 pour avoir accès au site.  
La documentation est disponible à l'adresse localhost:3000/documentation.
