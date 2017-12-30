// Load Module Dependencies
var express = require('express');

var matchController = require('../controllers/match');

var router = express.Router();


// matchs Endpoints

/**
 * @api {POST} /mathces/ Create Match
 * @apiName CreatMatch
 * @apiGroup Match
 *
 * @apiDescription Creates a new Match.
 *
 * @apiParam {String} male the male match
 * @apiParam {String} female the female match
 * @apiParam {String} percent_of_match how much are the two match in percent
 * @apiParam {String} communicating did the two party started to comunicate 

 * @apiParamExample Request Example:
 * {
 * 	"male":"5a4793b59e51352a30ed967c",
 * 	"female":"5a47972d54c2952e5c5fd60c",
 * 	"percent_of_match": "14.225",
 * 	"communicating": "ture"
 * }
 *
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
*  {
*      "_id": "5a47a647b201723f0e15c7db",
*      "last_modified": "2017-12-30T14:44:23.124Z",
*      "male": "5a4793b59e51352a30ed967c",
*      "female": "5a47972d54c2952e5c5fd60c",
*      "percent_of_match": 14.225,
*      "communicating": true
*  }
 */
router.post('/', matchController.creatMatch);

/**
 * @api {GET} /mathces/ Get Match By Pagnation
 * @apiName GetMatch
 * @apiGroup Match
 *
 * @apiDescription Get all matches by pagination
 *
 * @apiSuccessExample Response Example:
 *  HTTP/1.1 201 Created
*  {
*      "page": 1,
*      "total_docs": 3,
*      "total_pages": 1,
*      "per_page": 10,
*      "docs": [
*          {
*              "_id": "5a479c9a27112432913a7650",
*              "last_modified": "2017-12-30T14:03:06.809Z",
*              "date_created": "2017-12-30T14:03:06.809Z",
*              "male": "5a4793b59e51352a30ed967c",
*              "female": "5a47972d54c2952e5c5fd60c",
*              "percent_of_match": 74.25,
*              "communicating": false,
*              "__v": 0
*          },
*          {
*              "_id": "5a479cb127112432913a7651",
*              "last_modified": "2017-12-30T14:03:29.335Z",
*              "date_created": "2017-12-30T14:03:29.335Z",
*              "male": "5a4793b59e51352a30ed967c",
*              "female": "5a47972d54c2952e5c5fd60c",
*              "percent_of_match": 14.225,
*              "communicating": true,
*              "__v": 0
*          },
*          {
*              "_id": "5a47a647b201723f0e15c7db",
*              "last_modified": "2017-12-30T14:44:23.124Z",
*              "date_created": "2017-12-30T14:44:23.124Z",
*              "male": "5a4793b59e51352a30ed967c",
*              "female": "5a47972d54c2952e5c5fd60c",
*              "percent_of_match": 14.225,
*              "communicating": true,
*              "__v": 0
*          }
*      ]
*  }
 */
router.get('/', matchController.getCollectionByPagination);

// GET matchs/:matchId
router.get('/:id', matchController.getMatch);

// PUT matchs/:matchId
router.put('/:id', matchController.updateMatch);

// DELETE /matchs/:asuthorId
router.delete('/:id', matchController.removeMatch);

module.exports = router;