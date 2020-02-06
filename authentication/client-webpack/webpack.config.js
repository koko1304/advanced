const path = require('path');

// Frameworks Production
const webpack = require('webpack');

const VENDOR_LIBS = [
	"axios",
	"lodash",
	"react",
	"react-dom",
	"react-redux",
	"react-router-dom",
	"redux",
	"redux-form",
	"redux-thunk",
	"react-loadable"
];

module.exports = {
	// ++ Using for development
	// Required root of your app
	// entry: './src/index.js',

	// ++ Using for production
	// this entry point will split your file into 2 files
	// one for your app code and one for dependency
	entry: {
		// Required root of your app
		bundle: './src/index.js',
		// Array of app dependency
		vendor: VENDOR_LIBS
		// Note: key like bundle and vendor will be using as file name
	},

	// ++ Using for development
	// Specify where to output your final file and file name
	// output: {
	// 	// where do you want to output your files
	// 	// Note: required absolute file path reference
	// 	// path.resolve will guarantee your file path will work on all operation system
	// 	path: path.resolve(__dirname, 'build'),
	// 	// Specify your final file name
	// 	filename: 'bundle.js',
	// 	// Specify where the output files live
	// 	publicPath: 'build/'
	// },

	// ++ Using for production
	output: {
		// where do you want to output your files
		// Note: required absolute file path reference
		// path.resolve will guarantee your file path will work on all operation system
		path: path.resolve(__dirname, 'build'),
		// Specify your final file name
		// Note: [name] will be replace with entry point object key for each file
		filename: '[name].js',
		// Specify where the output files live
		publicPath: 'build/'
	},

	// ++ Both Dev and Prod
	module: {
		rules: [
			{
				// Compile only the file with .js extension
				test: /\.js$/,
				// Telling babel not to compile file in node_modules folder
				exclude: /node_modules/,
				// Tell webpack to allow babel to work with our code
				use: 'babel-loader'
			}
		]
	},

	// ++ Using for production
	plugins: [

		// Using for remove all the dependencies that available in bundle.js
		// that have the same with vendor.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	],

	// ++ Using for development
	// Solve the reloading problem with react using webpack-dev-server
	devServer: {
		historyApiFallback: true
	}
};

/*
+ babel-preset-env

Using for working with es6, es7, es8, ... and compile it to es5

Add: in the .baberc

+ babel-preset-react

Using for working with react and jsx and compile it to es5

Add: in the .baberc

+ webpack-dev-server

Pretend as a server and serve your code on local environment so
you can access your app as localhost:8080

- Automate rebuild when file change

+ babel-plugin-syntax-dynamic-import

Using to tell webpack how to work with dynamic import import(...)

Add: in the .baberc
*/