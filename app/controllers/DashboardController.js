module.exports.index = function (req, res) {

	res.render('admin/index',{tagline: "Dashboard", userAuth: req.user});
};