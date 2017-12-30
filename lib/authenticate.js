// Load Module Dependencies
var unless   = require('express-unless');

var TokenDal = require('../dal/token');

module.exports = function authenticate(opts) {

	var Authmiddleware = function middleware(req, res, next) {
		// 1. Retrieve Authorization Header
		// 2. Validate Authorization Header
		// 3. Allow/Disallow "User"

		var authorization = req.get('Authorization');

		if(!authorization) {
			res.status(403);
			res.json({
				status: 403,
				type: 'AUTHENTICATION_ERROR',
				message: 'You Joke Too Much!!!'
			});
			return;
		}
		
		var authParts = authorization.split(' ');

		if(authParts[0] !== 'Bearer' || !authParts[1]) {
			res.status(403);
			res.json({
				status: 403,
				type: 'AUTHENTICATION_ERROR',
				message: 'Wrong Authentication Schema'
			});

			return;
		}

		TokenDal.get({ value: authParts[1] }, function getToken(err, token){
			if(err){
				res.status(500);
				res.json({
					status: 500,
					type: 'AUTHENTICATION_ERROR',
					message: err.message
				})
				return;
			}

			if(!token._id) {
				res.status(403);
				res.json({
					status: 403,
					type: 'AUTHENTICATION_ERROR',
					message: 'Wrong Authentication Credentials'
				})
				return;
			} else if(token.revoked) {
				res.status(401);
				res.json({
					status: 401,
					type: 'AUTHENTICATION_ERROR',
					message: 'Action Denied!!'
				})
				return;

			} else {

				req._user = token.user;

				next();
			}
		})

		
	};

	Authmiddleware.unless = unless;

	return Authmiddleware;
};