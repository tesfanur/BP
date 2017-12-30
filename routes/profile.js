// Load Module Dependencies
var express = require('express');

var profileController = require('../controllers/profile');

var router = express.Router();


// profiles Endpoints


/**
 * @api {GET} /profile/ Get Profile By Pagnation
 * @apiName GetProfile
 * @apiGroup Profile
 *
 * @apiDescription Get all Profiles by pagination
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
  * {
 *     "page": 1,
 *     "total_docs": 2,
 *     "total_pages": 1,
 *     "per_page": 10,
 *     "docs": [
 *         {
 *             "_id": "5a4793b59e51352a30ed967c",
 *             "last_modified": "2017-12-30T13:25:09.736Z",
 *             "date_created": "2017-12-30T13:25:09.736Z",
 *             "email": "mamit@mamo.com",
 *             "user": "5a4793b59e51352a30ed967b",
 *             "__v": 0,
 *             "first_name": "Mamit",
 *             "last_name": "Mamo",
 *             "sex": "F",
 *             "picture": ""
 *         },
 *         {
 *             "_id": "5a47972d54c2952e5c5fd60c",
 *             "last_modified": "2017-12-30T13:39:57.294Z",
 *             "date_created": "2017-12-30T13:39:57.294Z",
 *             "email": "mamo@mamo.com",
 *             "user": "5a47972d54c2952e5c5fd60b",
 *             "__v": 0,
 *             "sex": "M",
 *             "picture": ""
 *         }
 *     ]
 * }
 */
router.get('/', profileController.getCollectionByPagination);

// GET profiles/:profileId
router.get('/:id', profileController.getProfile);

// PUT profiles/:profileId
router.put('/:id', profileController.updateProfile);

// DELETE /profiles/:asuthorId
router.delete('/:id', profileController.removeProfile);

module.exports = router;