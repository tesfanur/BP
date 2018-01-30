
var express 	= require('express');
var bodyParser 	= require('body-parser');
var mongoose    = require('mongoose');
var debug       = require('debug')('api');
var validator   = require('express-validator');
var cors        = require('cors');

var config 			= require('./config');
var logger			 = require('./lib/logger');
var authenticate     = require('./lib/authenticate');
var router           = require('./routes');

var app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL||config.MONGODB_URL);

// Listen to Connection to the DB
mongoose.connection.on('connected', function dbConnection(){
	debug('Connected to the DB');
});

// Listen to Error Connection to the DB
mongoose.connection.on('error', function dbError(){
	debug('Error Connecting to the DB');
});

//Allow CORS
app.use(cors(config.CORS_OPTS));

// Logging HTTP Method and URL
app.use(logger());

// Serve static page
app.use(express.static('public'));

// Authentication
app.use(authenticate().unless({
	path: ['/users/signup', '/users/login']
}));

// Parser JSON body Requests
app.use(bodyParser.json());

// Express Validator
app.use(validator());

router(app);

app.use(function notFound(req, res, next){
  res.status(404);
  res.json({
    status: 404,
    type: 'NOT_FOUND_ERROR',
    message: 'Endpoint Requested Not Found!!'
  })
});

app.use(function errorHandler(err, req, res, next){
	res.json({ message: err.message });
});

// Listen on Port
app.listen(config.HTTP_PORT, function connectionListener(){
	debug('Dating API is running on port', config.HTTP_PORT);
});

// Export app interface
module.exports = app;

