// Load Module Dependencies

module.exports = {
	// HTTP PORT
	HTTP_PORT: 7000,

	// DB Connection URL
	MONGODB_URL: 'mongodb://localhost/gebeya',

	//DB URL to put in heroku
	MONGODB_HEROKU: 'mongodb://date:date@ds133017.mlab.com:33017/dating-api',

	TOKEN_LENGTH: 57,

	CORS_OPTS: {
		    origin: '*',
		    methods: 'GET,POST,PUT,DELETE,OPTIONS',
		    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  	},
};