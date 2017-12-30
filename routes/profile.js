// Load Module Dependencies
var express = require('express');

var profileController = require('../controllers/profile');

var router = express.Router();


// profiles Endpoints


// GET /profiles/
router.get('/', profileController.getCollectionByPagination);

// GET profiles/:profileId
router.get('/:id', profileController.getProfile);

// PUT profiles/:profileId
router.put('/:id', profileController.updateProfile);

// DELETE /profiles/:asuthorId
router.delete('/:id', profileController.removeProfile);

module.exports = router;