// Load Module Dependencies
// ['photography', 'contributor']

module.exports = function authorization(opts) {

	return function middleware(req, res, next) {
		// 1. Check if user is set on the request object
		// 2. Validate against the passed role/realm in opts against user role/realm
		// 3. If Authorized pass controll to the controller otherwise reject

		if(!req._user) {
			res.status(401);
			res.json({
				status: 401,
				type: 'AUTHORIZATION_ERROR',
				message: 'Missing Authenticated User'
			});
			return;
		}

		var user = req._user;
		var isAuthorized = false

		opts.forEach(function (acl) {
			if(acl === '*' || user.role === acl || user.realm === acl) {
					isAuthorized = true;
			}
		});

		if(!isAuthorized) {
			res.status(401);
			res.json({
				status: 401,
				type: 'AUTHORIZATION_ERROR',
				message: 'Action Not Allowed'
			});
			return;
		} else {
			next();
		}

	}
}