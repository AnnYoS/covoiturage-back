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

Une fois le service lancé, on peux créer la base de données avec la commande :
$ mongo < scripts-db/createTable.js

Pour tester que la base de données a bien été instanciée, on utilise la commande :
$ mongo < scripts-db/testTable.js

On devrait alors voir apparaître un utilisateur ainsi qu'un trajet (ou plusieurs si le script a été lancé plusieurs fois). On peut donc à présent tester l'application de covoiturage.

Pour ultérieurement supprimer la base il faudra utiliser la commande :
$ mongo < deleteTable.js