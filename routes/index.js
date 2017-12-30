// Load Module Dependencies

var userRouter  	= require('./user');
var matchRouter 	= require('./match');
var profileRouter 	= require('./profile');
var messageRouter	= require('./message');


module.exports = function appRouter(app) {
	// User Routes
	app.use('/users', userRouter);

	// Match Routes
	app.use('/matches', matchRouter);

	// Profile Routes
	app.use('/profiles', profileRouter);

	//Message Routes
	app.use('/messages', messageRouter);

	app.get('/', function getRoot(req, res){
		res.json({
			message: 'Dating API Running'
		})
	});

}