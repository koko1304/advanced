const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Create a schema for model
// schema is using to create data structure or
// schema is using to structure the document 
const userSchema = new Schema({
	// this schema have 2 data. email and password
	email: {
		// email must be a string
		type: String,
		// email must be unique or different from existed emails
		unique: true,
		// email will be tranform to lowercase before save to database
		lowercase: true
	},
	// password must be a string
	password: String
});

// Before saving a record, run this function.
// Don't using arrow function as callback because 'this' will be point to wrong user object
userSchema.pre('save', function(next) {
	// Access the pending user record
	var user = this;

	// hash (Encrypt) password
	bcrypt.hash(user.password, null, null, (err, hash) => {
		if (err) {
			console.log(err);

			return;
		}

		// Overwrite plain text password with encrypt password
		user.password = hash;

		// Save it
		next();
	});
});

// Create a collection call user
// Note: user will be store as users in database
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;