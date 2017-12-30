// Load Module Dependencies
var express = require('express');

var userController = require('../controllers/user');
var authController = require('../controllers/auth');

var router = express.Router();


/**
 * @api {POST} /user/signup User Signup
 * @apiName SignupUser
 * @apiGroup Auth
 *
 * @apiDescription Creates a new User and corresponding User Type.
 *
 * @apiParam {String} email User Email
 * @apiParam {String} password User Password
 * @apiParam {String} role User Role ie talent, trainee, trainer or admin
 * @apiParam {String} first_name User First Name
 * @apiParam {String} last_name User Last Name
 * @apiParam {String} [nationality] User nationality
 *
 * @apiParamExample Request Example:
 * {
 *	"email": "john@gebeya.com",
 *	"password": "password",
 *	"first_name": "John",
 *	"last_name": "Doe",
 *	"role": "talent"
 * }
 *
 * @apiSuccess {String} _id User Id
 * @apiSuccess {String} username User Username
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} realm User Realm
 * @apiSuccess {Date} last_login Last Login Date
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
 * {
 *  "_id": "5a01de75e020c76235032029",
 *	"username": "john@gebeya.com",
 *	"role": "talent",
 *  "realm": "user",
 *  "last_login": "2017-11-21T16:53:23.820Z"
 * }
 */
router.post('/signup', userController.createUser);

// POST /user/login
router.post('/login', authController.loginUser);

// PUT /user/logout
router.put('/logout', authController.logoutUser);


// Expose Router Interface
module.exports = router;