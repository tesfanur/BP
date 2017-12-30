// Load Module Dependencies
var express = require('express');

var matchController = require('../controllers/match');

var router = express.Router();


// matchs Endpoints

// POST matchs
router.post('/', matchController.creatMatch);

// GET /matchs/
router.get('/', matchController.getCollectionByPagination);

// GET matchs/:matchId
router.get('/:id', matchController.getMatch);

// PUT matchs/:matchId
router.put('/:id', matchController.updateMatch);

// DELETE /matchs/:asuthorId
router.delete('/:id', matchController.removeMatch);

module.exports = router;