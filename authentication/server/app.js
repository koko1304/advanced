// Frameworks
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to mongodb
mongoose.connect('mongodb://koko1304:gno654171@mov-db-shard-00-00-0pvr7.mongodb.net:27017,mov-db-shard-00-01-0pvr7.mongodb.net:27017,mov-db-shard-00-02-0pvr7.mongodb.net:27017/authtest?ssl=true&replicaSet=mov-db-shard-0&authSource=admin');

// check for server environment port if undefined use 8090 instead
const port = process.env.PORT || 8090

// Middleswares

// cors middleware using to allow different domain (origin) to be able to request to this server
// you can config cors to allow only some specific domain as well
// exposedHeaders using to allow client to access specific header on response
app.use(cors({ exposedHeaders: 'WWW-Authenticate'})); 

// Teach express how to parse json request
app.use(bodyParser.json({ type: '*/*' }));

// Put router handler in other file
require('./router')(app);

// Start server and listen on port 8090
app.listen(port, () => {
	console.log('Server Listening on', port);
});