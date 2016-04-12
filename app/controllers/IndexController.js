module.exports.index = function (req, res) {

	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT artikel.*,category.name FROM artikel left join category on category.id = artikel.category_id', function (err, rows) {

			var query = connection.query('SELECT * FROM category', function (err2, rows2) {

				if (err) {
					
					console.log("Error : %s ", err);
					
					}
				if (err2) {
					
					console.log("Error : %s ", err2);
					
					}

				res.render('index',{artikels: rows, categorys: rows2 });

			});

		});

	});
};

module.exports.readmore = function (req, res) {

	var name = req.params.name;

	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT artikel.*,category.name FROM artikel left join category on category.id = artikel.category_id WHERE artikel.title = ? ',[name], function (err, rows) {
			console.log(rows);
			var query = connection.query('SELECT * FROM category', function (err2, rows2) {

				var query = connection.query('SELECT artikel.*,category.name FROM artikel left join category on category.id = artikel.category_id', function (err3, rows3) {
				if (err) {
					
					console.log("Error : %s ", err);
					
					}
				if (err2) {
					
					console.log("Error : %s ", err2);
					
					}

				res.render('readmore',{artikels: rows3, categorys: rows2, artikeles: rows});

				});

			});

		});

	});
};