const knex = require('knex')({
	client: 'pg',
	connection: {
		host:'localhost',
		port:5432,
		user: 'postgres',
		password: 'password',
		database: 'tudu'
	}
})


module.exports = knex;
