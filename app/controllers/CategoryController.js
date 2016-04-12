module.exports.index = function (req, res) {

	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT * FROM category', function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.render('admin/category-index', {tagline: "Category", categorys: rows, userAuth: req.user});

		});

	});

};

module.exports.create = function (req, res) {
	
	res.render('admin/category-create', {tagline: "Insert your new Category", userAuth: req.user});
		

};

/*
used to handle store request
post data name, age, hobby, photo
response render redirect to / (index)
 */
module.exports.store = function (req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input.name);
	req.getConnection(function (err, connection) {

		var data = {
			name: input.name,
		};

		var query = connection.query("INSERT INTO category SET ? ", data, function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/category');

		});

	});

};

module.exports.edit = function (req, res) {

	var id = req.params.id;

	req.getConnection(function (err, connection) {

		var query = connection.query("SELECT * FROM category WHERE id = ? ", [id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.render('admin/category-edit', {tagline: "Edit your category", category: rows, userAuth: req.user});

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
	var id = req.params.id;

	req.getConnection(function (err, connection) {

		var data = {
			name: input.name,
		};

		var query = connection.query("UPDATE category SET ? WHERE id = ? ", [data, id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/category')

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

		connection.query("DELETE FROM category WHERE id = ? ", [id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/category');

		});

	});

};