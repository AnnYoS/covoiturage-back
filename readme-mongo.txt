Pour initialiser la base de données MongoDB :

Lancer le service avec la commande :

avec homebrew :
$ brew services start mongodb-community

avec service :
$ sudo service mongod start
et vérifier que le service est bien lancé :
$ sudo service mongod status

avec systemd :
$ sudo systemctl start mongod
et vérifier que le service est bien lancé :
$ sudo systemctl status mongod

Une fois le service lancé, on peux initialiser la base de données avec la commande :
$ mongo < scripts-db/initTable.js

Ce scirpt permet de vider la base si elle existe déjà, de la créer et de la remplir avec des utilisateurs et des trajets.

Pour ultérieurement supprimer la base il faudra utiliser la commande :
$ mongo < deleteTable.js

On peut désormais lancer le back ainsi que le front et utiliser le site à l'adresse http://localhost:4200
