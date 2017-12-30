// Load Module Dependencies
var express = require('express');

var messageController = require('../controllers/message');

var router = express.Router();


// messages Endpoints

// POST messages
router.post('/', messageController.creatMessage);

// GET /messages/
router.get('/', messageController.getCollectionByPagination);

// GET messages/:messageId
router.get('/:id', messageController.getMessage);

// PUT messages/:messageId
router.put('/:id', messageController.updateMessage);

// DELETE /messages/:asuthorId
router.delete('/:id', messageController.removeMessage);

module.exports = router;