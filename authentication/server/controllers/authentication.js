const UserModel = require('../models/user');
const jwt = require('jwt-simple');
const { secretKey } = require('../myconfig');

// create a function for generate jwt token
const generateJsonWebToken = (user) => {
	// Get current time
	const now = new Date().getTime();

	// Generate a json web token
	const token = jwt.encode({ id: user._id, date: now }, secretKey);

	return token;
}

// Handling Sign Up New User
module.exports.signup = (req, res) => {
	// get email and password from body request
	const { email, password } = req.body;

	// Are email and password have provide ?
	if (!email || !password) {

		//response with 422 status code and send back error message
		res.status(422).send({ err: "Email and Password are required" });

		return;
	}

	// if a user with a given email
	UserModel.findOne({ email }, (err, existedUser) => {
		
		// Any error while finding user in database?
		if (err) {
			console.log(err);

			return;
		}

		// Is email already existed ?
		if (existedUser) {

			// if email is already existed so send back error as response
			res.status(422).send({ err: "Email is already exist"});

			return;
		}

		// Create user with a given email and password if user doesn't existed
		const user = new UserModel({
			email,
			password
		});

		// Save user
		user.save((err) => {

			// Any error while saving user ?
			if (err) {
				console.log(err);

				return;
			}

			// Send user a token
			res.send({ token: generateJsonWebToken(user) });
		});

	});

};

// Handling Give Token to Sign In User
module.exports.signin = (req, res) => {

	// Passport have provide us the ability to access the user by req.user
	// send a token back when they successful sign in
	res.send({ token: generateJsonWebToken(req.user) });
}