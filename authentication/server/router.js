// Frameworks
const passport = require('passport');

// Controllers
const Authentication = require('./controllers/authentication');

// Services
// Setup jwt token strategy to verify any request that want to access protected route
const passportJwtService = require('./services/passport-jwt');
// Setup local strategy for handle user login
const passportLocalService = require('./services/passport-local');

// Create jwt token middleware for checking user token before running route handler and prevent
// passport from create session for user
const requireAuth = passport.authenticate('jwt', { session: false });

// Create local middleware for checking user email and password before running route handler function
// and prevent passport from create session for user
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
	// Insert requireAuth as a middleware so this route could be access
	// if you authorize from the passport or give the valid token
	app.get('/', requireAuth, (req, res) => {
		res.send({ message: 'Welcome to training area' });
	});

	// Insert requireSignin as a middleware so this route will be require
	// email and password before user can get a token back as a response
	// to access other protected routes
	app.post('/signin', requireSignin, Authentication.signin);

	app.post('/signup', Authentication.signup);

};