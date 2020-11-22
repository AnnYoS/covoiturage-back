//change la base de données active, si covoiturage n'existe pas, elle se créée automatiquement.
use covoiturage;

//insertion d'un utilisateur
db.users.insert({
	firstname: 'Micheline',
	lastname: 'Garnier',
	age: 32,
	phone: '0700000000',
	mail: 'micheline.garnier@joie.fr'
});

//insertion d'un trajet
db.drives.insert({
	driver: '1',
	clients: [],
	start: {
		street: 'rue de la Paix',
		postalCode: '75000',
		city: 'Paris'
	},
	finish: {
		street: 'rue du Débarquement',
		postalCode: '75000',
		city: 'Paris'
	},
	duration: 3,
	price: 53.2,
	stops: [
		{street: 'rue du moine',
		postalCode: '75000',
		city: 'Paris'}
	],
	nbSeats: 4,
	date: '12/03/2021'
});
