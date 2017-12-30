/**
 * Load Module Dependencies
 */

var EventEmitter = require('events').EventEmitter;

var debug = require('debug')('api:user-controller');

var UserDal 	= require('../dal/user');
var ProfileDal 	= require('../dal/profile');



/**
 * Create User
 * 
 * @desc Create User and User Type then Respond with
 *       created user
 * 
 * @throws {USER_CREATION_ERROR}
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware Dispatcher
 */
exports.createUser = function createUser(req, res, next){
	debug('Create User');
	var body = req.body;

	var workflow = new EventEmitter();

	// Validate User Data
	// Trust No One
	workflow.on('validation', function () {
		req.checkBody('email')
		   .notEmpty().withMessage('Email is Empty')
		   .isEmail().withMessage('Email is not Valid');
		req.checkBody('password')
			.notEmpty().withMessage('Password is Empty');

		var errors = req.validationErrors();

		if(errors) {
			res.status(400);
			res.json({
				status: 400,
				type: 'USER_CREATION_ERROR',
				message: errors
			});
		} else {
			body.username = body.email;
			workflow.emit('exists');
		}
	});

	workflow.on('exists', function () {
		UserDal.get({ username: body.username }, function userExists(err, user){
			if(err) {
				res.status(500);
				res.json({
					status: 500,
					type: 'USER_CREATION_ERROR',
					message: err.message
				});
				return;
			}
			// truthy vs falsey
			if(user._id) {
				res.status(400);
				res.json({
					status: 400,
					type: 'USER_CREATION_ERROR',
					message: 'User With Those Credentials Exists'
				});
				return;
			}

			workflow.emit('createUser');
		})
	});

	workflow.on('createUser', function(){
		UserDal.create(body, function createUser(err, user){
			if(err) {
				res.status(500);
				res.json({
					status: 500,
					type: 'USER_CREATION_ERROR',
					message: err.message
				});
				return;
			}

			body.user = user._id;

			workflow.emit('createProfile', user);
		});
	});

	workflow.on('createProfile', function(user) {

			ProfileDal.create(body, function createProfile(err, talent) {
				if(err) {
				res.status(500);
				res.json({
					status: 500,
					type: 'USER_CREATION_ERROR',
					message: err.message
				});
				return;
			}

			workflow.emit('respond', user);
			})
	});

	workflow.on('respond', function(user) {
		res.status(201);
		res.json(user);
	});


	workflow.emit('validation');
};

// Get User Collection by Pagination
exports.getCollectionByPagination = function getCollectionByPagination(req, res, next){
	debug('Get Users Collection By Pagination');

	var query = req.query.query || {};
	var qs = req.query;

	UserDal.getCollectionByPagination(query, qs, function (err, docs){
		if(err) {
				res.status(500);
				res.json({
					status: 500,
					type: 'TALENT_COLLECTION_PAGINATED_ERROR',
					message: err.message
				});
				return;
		}

		res.json(docs);
	})
}

/**
 * Delete User
 * 
 * @desc Delete User and Corresponding User from the DB
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} res HTTP Response Object
 * @param {Function} next Middleware Dispatcher
 */
 exports.remove = function removeUser(req, res, next) {
 	debug('Remove User: ', req.params.id);

 	var query = {
 		_id: req.params.id
 	};
 	
 	UserDal.delete(query, function deleteUser(err, user){
 		if(err){
 		  res.status(500);
      res.json({
        status: 500,
        type: 'USER_REMOVE_ERROR',
        message: err.message
      });
      return;
 		}

    if(!user._id) {
      res.status(400);
      res.json({
          status: 400,
          type: 'USER_REMOVE_ERROR',
          message: 'User Does not Exist!!'
      });
      return;
    }

    // if(user.role === 'talent') {
    //   TalentDal.delete({ user: user._id }, function deleteTalent(err, talent){
    //     if(err){
    //       res.status(500);
    //       res.json({
    //         status: 500,
    //         type: 'USER_REMOVE_ERROR',
    //         message: err.message
    //       });
    //       return;
    //     }

    //     res.json(user);
    //   });
    // }

 	})
 };

// Noop Method
exports.noop = function noop(req, res, next) {
	res.json({
		message: 'To be Implemented'
	});
}