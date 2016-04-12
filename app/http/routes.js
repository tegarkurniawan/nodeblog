var IndexController = require('../controllers/IndexController');
var LoginController = require('../controllers/LoginController');
var DashboardController = require('../controllers/DashboardController');
var ArtikelController = require('../controllers/ArtikelController');
var CategoryController = require('../controllers/CategoryController');
module.exports = function (app, upload, passport) {
	
	app.get('/', isGuest, IndexController.index);
	app.get('/login', isGuest, LoginController.index);
	app.post('/login/do', isGuest, passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure INDEX section
            failureRedirect : '/login', // redirect back to the login page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/login');
    });
    app.get('/dashboard', isLoggedIn, DashboardController.index);

    app.get('/artikel', isLoggedIn, ArtikelController.index);
    app.get('/artikel/create', isLoggedIn, ArtikelController.create);
	app.post('/artikel/store', isLoggedIn, upload.single('photo'), ArtikelController.store);
	app.get('/artikel/edit/:id', isLoggedIn, ArtikelController.edit);
	app.post('/artikel/update/:id', isLoggedIn, upload.single('photo'), ArtikelController.update);
	app.get('/artikel/destroy/:id', isLoggedIn, ArtikelController.destroy);

    app.get('/category', isLoggedIn, CategoryController.index);
    app.get('/category/create', isLoggedIn, CategoryController.create);
	app.post('/category/store', isLoggedIn, CategoryController.store);
	app.get('/category/edit/:id', isLoggedIn, CategoryController.edit);
	app.post('/category/update/:id', isLoggedIn, CategoryController.update);
	app.get('/category/destroy/:id', isLoggedIn, CategoryController.destroy);

    app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});


	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
}
// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}

// route middleware to make sure
function isGuest(req, res, next) {

	// if user is not authenticated in the session, carry on
	if (req.isUnauthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}