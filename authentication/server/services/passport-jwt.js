// Frameworks
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// User Model
const UserModel = require('../models/user');

// Secret Token Key
const { secretKey } = require('../myconfig');

// Setup options for JWT Strategy
const jwtOptions = {
	// Get the token from request header at authorization key
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),

	// This is a secret key for decode token
	secretOrKey: secretKey
};

// Create JWT strategy

// Jwt Strategy using jwtOptions to know how to decode the token and pass it as payload to the callback function
// done is using to tell the JwtStrategy is the user should authorize or not
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

	// Go to find the user with the id that get from the decode token
	UserModel.findById(payload.id, (err, user) => {

		// user won't authorize if there is an error from database
		if (err) return done(err, false);

		if (user) {

			// user is authorize cuz there is an user match the token id
			return done(null, user);

		} else {

			// user won't authorize if there is no user match the token id
			return done(null, false);

		}
	});
});

// Tell passport to recognize the jwt strategy
passport.use(jwtLogin);