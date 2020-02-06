const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');

// User Model
const UserModel = require('../models/user');

// Local Strategy Options
const localOptions = {
	// Because of we using email for log in so
	// we have to tell local strategy to use
	// email instead of username field
	usernameField: 'email'

	// Note: we don't specify the password field because
	// it automatic handle it for us
};

// Create Local Strategy

// This Local Strategy will find the email and password in the request and pass it to
// callback function for you to work with
// done is using to tell the Local Strategy is the user should authorize or not
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	// Find the user with the given email
	UserModel.findOne({ email }, (err, user) => {
	
		// If there is an error from database so user will unauthorize
		if (err) return done(err);

		// If there is no user in the database so user will unauthorize
		// and send error message back to client in response header (www-authenticate)
		if (!user) return done(null, false, 'Incorrect email address!');

		// Compare the database password with providing password
		bcrypt.compare(password, user.password, (err, isMatch) => {

			// If any error so user will unauthorize
			if (err) return done(err);

			// If the password is match so user will authorize
			if (isMatch) {

				return done(null, user);

			} else {
				
				// If the password isn't match so user will unauthorize
				// and send error message back to client in response header (www-authenticate)
				return done(null, false, 'Incorrect password!');

			}

		});
	});
});

// Tell passport to recognize the local strategy
passport.use(localLogin);