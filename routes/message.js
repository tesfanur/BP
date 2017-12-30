// Load Module Dependencies
var express = require('express');

var messageController = require('../controllers/message');

var router = express.Router();


// messages Endpoints

/**
 * @api {POST} /messages/ Create Message
 * @apiName CreatMessage
 * @apiGroup Message
 *
 * @apiDescription Creates a new Message.
 *
 * @apiParam {String} frpm ID of the sender
 * @apiParam {String} to Id of the reciver
 * @apiParam {String} Subject subject of the message
 * @apiParam {String} content content of the message 

 * @apiParamExample Request Example:
 * {
 * 	"from":"5a4793b59e51352a30ed967c",
 * 	"to":"5a47972d54c2952e5c5fd60c",
 * 	"subject": "HEY 2",
 * 	"content": "HEY YOU!!"
 * }
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
*  {
*      "_id": "5a47a776ad32f54046fd7664",
*      "last_modified": "2017-12-30T14:49:27.005Z",
*      "from": "5a4793b59e51352a30ed967c",
*      "to": "5a47972d54c2952e5c5fd60c",
*      "content": "HEY YOU!!"
*  }
 */
router.post('/', messageController.creatMessage);

/**
 * @api {GET} /messages/ Get Message By Pagnation
 * @apiName GetMessage
 * @apiGroup Message
 *
 * @apiDescription Get all messages by pagination
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
 *  {
 *     "page": 1,
 *     "total_docs": 2,
 *     "total_pages": 1,
 *     "per_page": 10,
 *     "docs": [
 *         {
 *             "_id": "5a4798fb349b472eafd79808",
 *             "last_modified": "2017-12-30T13:47:39.984Z",
 *             "date_created": "2017-12-30T13:47:39.984Z",
 *             "from": "5a4793b59e51352a30ed967c",
 *             "to": "5a47972d54c2952e5c5fd60c",
 *             "subject": "HEY 2",
 *             "content": "HEY YOU!!",
 *             "__v": 0
 *         },
 *         {
 *             "_id": "5a47a776ad32f54046fd7664",
 *             "last_modified": "2017-12-30T14:49:27.005Z",
 *             "date_created": "2017-12-30T14:49:27.005Z",
 *             "from": "5a4793b59e51352a30ed967c",
 *             "to": "5a47972d54c2952e5c5fd60c",
 *             "subject": "HEY 2",
 *             "content": "HEY YOU!!",
 *             "__v": 0
 *         }
 *     ]
 * }
 */
router.get('/', messageController.getCollectionByPagination);

// GET messages/:messageId
router.get('/:id', messageController.getMessage);

// PUT messages/:messageId
router.put('/:id', messageController.updateMessage);

// DELETE /messages/:asuthorId
router.delete('/:id', messageController.removeMessage);

module.exports = router;