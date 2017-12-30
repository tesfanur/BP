// Access Layer for message Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-message');
var moment  = require('moment');
var _       = require('lodash');

var message        = require('../models/message');

var returnFields = message.whitelist;
var population = [];

/**
 * create a new message.
 *
 * @desc  creates a new message and saves them
 *        in the database
 *
 * @param {Object}  messageData  Data for the message to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(messageData, cb) {
  debug('creating a new message');

  // Create message if is new.
  var messageModel  = new message(messageData);

  messageModel.save(function savemessage(err, data) {
    if (err) {
      return cb(err);
    }

    exports.get({ _id: data._id }, function (err, message) {
      if(err) {
        return cb(err);
      }

      cb(null, message);

    });

  });

};

/**
 * delete a message
 *
 * @desc  delete data of the message with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deletemessage(query, cb) {
  debug('deleting message: ', query);

  message
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deletemessage(err, message) {
      if (err) {
        return cb(err);
      }

      if(!message) {
        return cb(null, {});
      }

      message.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, message);

      });

    });
};

/**
 * update a message
 *
 * @desc  update data of the message with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating message: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  message
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatemessage(err, message) {
      if(err) {
        return cb(err);
      }

      cb(null, message || {});
    });
};

/**
 * get a message.
 *
 * @desc get a message with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, toFilter, cb) {
  debug('getting message ', query);

  if(arguments.length < 3) {
    cb = toFilter;
    toFilter = true;
  }

  message
    .findOne(query, toFilter ? returnFields : null)
    .populate(population)
    .exec(function(err, message) {
      if(err) {
        return cb(err);
      }

      cb(null, message || {});
    });
};

/**
 * get a collection of messages
 *
 * @desc get a collection of messages from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of messages');

  cb(null,
     message
      .find(query, returnFields)
      .populate(population)
      .stream({ transform: JSON.stringify }));

};

/**
 * get a collection of messages using pagination
 *
 * @desc get a collection of messages from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of messages');

  var opts = {
    fields: returnFields,
    sort: qs.sort || {},
    populate: population,
    page: qs.page || 1,
    limit: qs.per_page || 10
  };

  message.paginate(query, opts, function (err, data){
    if(err){
      return cb(err);
    }

    var response = {
      page: data.page,
      total_docs: data.total,
      total_pages: data.pages,
      per_page: data.limit,
      docs: data.docs
    };

    cb(null, response);

  });

};


