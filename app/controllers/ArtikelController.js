module.exports.index = function (req, res) {

	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT artikel.*,category.name FROM artikel left join category on category.id = artikel.category_id', function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.render('admin/artikel-index', {tagline: "Artikel", artikels: rows, userAuth: req.user});

		});

	});
	
};

module.exports.create = function (req, res) {

	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT * FROM category', function (err, rows) {
			
			if (err) {
				console.log("Error : %s ", err);
			}
			res.render('admin/artikel-create', {tagline: "Insert your new artikel", categorys: rows, userAuth: req.user});
		});

	});

};

/*
used to handle store request
post data name, age, hobby, photo
response render redirect to / (index)
 */
module.exports.store = function (req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	var inputFile = JSON.parse(JSON.stringify(req.file));

	req.getConnection(function (err, connection) {

		var data = {
			title: input.title,
			description: input.description,
			category_id: input.category_id,
			photo: inputFile.filename
		};

		var query = connection.query("INSERT INTO artikel SET ? ", data, function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/artikel');

		});

	});

};

module.exports.edit = function (req, res) {

	var id = req.params.id;

	req.getConnection(function (err, connection) {

		var query = connection.query("SELECT artikel.*,category.name FROM artikel INNER JOIN category ON category.id=artikel.category_id WHERE artikel.id = ?  ", [id], function (err, rows) {
			console.log(rows);
			var query2 = connection.query('SELECT * FROM category', function (err2, rows2) {
				console.log(rows2);
				if (err) {
					console.log("Error : %s ", err);
				}
				res.render('admin/artikel-edit', {tagline: "Edit your artikel", artikel: rows, categorys:rows2 , userAuth: req.user});

			});

		});

	});

};

/*
used to handle update request
get id
post name, age, hobby
response render redirect to / (index)
 */
module.exports.update = function (req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	var inputFile = JSON.parse(JSON.stringify(req.file));
	var id = req.params.id;

	req.getConnection(function (err, connection) {

		var data = {
			title: input.title,
			description: input.description,
			category_id: input.category_id,
			photo: inputFile.filename
		};

		var query = connection.query("UPDATE artikel SET ? WHERE id = ? ", [data, id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/artikel')

		});

	});

};

/*
used to handle destroy request
get id
response render redirect to / (index)
 */
module.exports.destroy = function (req, res) {

	var id = req.params.id;

	req.getConnection(function (err, connection) {

		connection.query("DELETE FROM artikel WHERE id = ? ", [id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/artikel');

		});

	});

};