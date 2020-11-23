/// Suppression de la basse de données

use covoiturage;

db.dropDatabase();

/// Initialisation de la base de données

//change la base de données active, si covoiturage n'existe pas, elle se créée automatiquement.
use covoiturage;

//insertion d'utilisateurs
db.users.insertMany([
	{
		firstname: 'Micheline',
		lastname: 'Garnier',
		age: 72,
		phone: '+33700000000',
		mail: 'micheline.garnier@sansphoto.fr'
	},
	{
		firstname: 'Jean-Marie',
		lastname: 'Bellefrance',
		age: 73,
		phone: '+33700000010',
		mail: 'jean-marie.bellefrance@avecphoto.com',
		photo: 'https://randomuser.me/api/portraits/men/82.jpg'
	},
	{
		firstname: 'Jacqueline',
		lastname: 'Garnier',
		age: 93,
		phone: '+33700000001',
		mail: 'jacqueline.garnier@sansphoto.fr'
	},
	{
		firstname: 'Juan',
		lastname: 'CeciEstUnNomDeFamilleNonRaciste',
		age: 22,
		phone: '+33700000100',
		mail: 'juan.ceciestunnomdefamillenonraciste@sansphoto.com'
	},
	{
		firstname: 'Pierrette',
		lastname: 'Bellefrance',
		age: 88,
		phone: '+33700000011',
		mail: 'pierrette.bellefrance@avecphoto.com',
		photo: 'https://randomuser.me/api/portraits/women/14.jpg'
	},
	{
		firstname: 'Donald',
		lastname: 'Trump',
		age: 74,
		phone: '+33700000232',
		mail: 'donald.trump@fakenews.com',
		photo: 'https://randomuser.me/api/portraits/lego/2.jpg'
	}
]);

var michGar = db.users.find({'firstname': 'Micheline', 'lastname': 'Garnier'})[0]._id.str

var jmBf = db.users.find({'firstname': 'Jean-Marie', 'lastname': 'Bellefrance'})[0]._id.str

var jacGar = db.users.find({'firstname': 'Jacqueline', 'lastname': 'Garnier'})[0]._id.str

var juanC = db.users.find({'firstname': 'Juan', 'lastname': 'CeciEstUnNomDeFamilleNonRaciste'})[0]._id.str

var pierBf = db.users.find({'firstname': 'Pierrette', 'lastname': 'Bellefrance'})[0]._id.str

var donTru = db.users.find({'firstname': 'Donald', 'lastname': 'Trump'})[0]._id.str

//insertion d'un trajet
db.drives.insertMany([
	{
		driver: donTru,
		start: {
			street: 'rue de la Présidence',
			postalCode: '75000',
			city: 'Paris'
		},
		finish: {
			street: 'rue de la Retraite',
			postalCode: '13000',
			city: 'Marseille'
		},
		duration: 12,
		price: 270.232,
		nbSeats: 4,
		date: '20/01/2021'
	},
	{
		driver: michGar,
		start: {
			street: 'rue sans Clients',
			postalCode: '75000',
			city: 'Paris'
		},
		finish: {
			street: 'rue avec Arrêts',
			postalCode: '13000',
			city: 'Marseille'
		},
		stops: [
			{
				street: 'rue du Premier Arrêt',
				postalCode: '13000',
				city: 'Marseille'
			},
			{
				street: 'rue du Second Arrêt',
				postalCode: '69000',
				city: 'Lyon'
			}
		],
		duration: 120,
		price: 149.99,
		nbSeats: 4,
		date: '01/01/2021'
	},
	{
		driver: jmBf,
		start: {
			street: 'rue avec Clients',
			postalCode: '75000',
			city: 'Paris'
		},
		finish: {
			street: 'rue sans Arrêts',
			postalCode: '13000',
			city: 'Marseille'
		},
		clients: [pierBf, juanC],
		duration: 120,
		price: 149.99,
		nbSeats: 4,
		date: '01/01/2021'
	},
	{
		driver: jacGar,
		start: {
			street: 'rue avec Clients',
			postalCode: '75000',
			city: 'Paris'
		},
		finish: {
			street: 'rue avec Arrêts',
			postalCode: '13000',
			city: 'Marseille'
		},
		clients: [juanC, donTru],
		stops: [
			{
				street: 'rue du Premier Arrêt',
				postalCode: '13000',
				city: 'Marseille'
			},
			{
				street: 'rue du Second Arrêt',
				postalCode: '69000',
				city: 'Lyon'
			}
		],
		duration: 54,
		price: 26,
		nbSeats: 4,
		date: '25/11/2020'
	}
]);
