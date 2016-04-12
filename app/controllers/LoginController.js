module.exports.index = function (req, res) {
	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT * FROM category', function (err2, rows2) {
			
			if (err2) {
					
					console.log("Error : %s ", err2);
					
					}

			res.render('login', {tagline: "Login page", message: req.flash('loginMessage'), categorys:rows2 });

		});

	});
	

};