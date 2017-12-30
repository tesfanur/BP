// Load Module Dependencies
var express = require('express');

var userController = require('../controllers/user');
var authController = require('../controllers/auth');

var router = express.Router();


/**
 * @api {POST} /user/signup User Signup
 * @apiName SignupUser
 * @apiGroup User
 *
 * @apiDescription Creates a new User and corresponding User Type.
 *
 * @apiParam {String} email User Email
 * @apiParam {String} password User Password
 * @apiParamExample Request Example:
 * {
 *	"email": "john@gebeya.com",
 *	"password": "password",
 * }
 *
 * @apiSuccess {String} _id User Id
 * @apiSuccess {String} username User Username
 * @apiSuccess {Date} last_login Last Login Date
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
 * {
 *  "_id": "5a01de75e020c76235032029",
 *	"username": "john@gebeya.com",
 *  "last_login": "2017-11-21T16:53:23.820Z"
 * }
 */
router.post('/signup', userController.createUser);

/**
 * @api {POST} /user/login User Login
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiDescription Creates a new User and corresponding User Type.
 *
 * @apiParam {String} email User username
 * @apiParam {String} password User Password
 * @apiParamExample Request Example:
 * {
 *	"username": "john@gebeya.com",
 *	"password": "password",
 * }
 *
 * @apiSuccess {String} tokne User token
 * @apiSuccess {User} User
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
 * {
 *     "token": "d6uAPieIO8O0qWrnDq6gSwS0HEyEILiab558mkOqxXfHweWr1XcxwvFME/r/WwVZwkDfrjj86Z6v",
 *     "user": {
 *         "_id": "5a4793b59e51352a30ed967c",
 *         "last_modified": "2017-12-30T13:25:09.736Z",
 *         "date_created": "2017-12-30T13:25:09.736Z",
 *         "email": "mamit@mamo.com",
 *         "user": "5a4793b59e51352a30ed967b",
 *         "first_name": "Mamit",
 *         "last_name": "Mamo",
 *         "picture": ""
 *     }
 * }
 */
router.post('/login', authController.loginUser);

// PUT /user/logout
router.put('/logout', authController.logoutUser);


// Expose Router Interface
module.exports = router;