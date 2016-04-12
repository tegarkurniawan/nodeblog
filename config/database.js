module.exports = function (app, connection, mysql) {

	app.use(

		connection(mysql, {
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'nodeblog'
		}, 'pool')

	);
	
}