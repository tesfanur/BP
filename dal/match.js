// Access Layer for match Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-match');
var moment  = require('moment');
var _       = require('lodash');

var match        = require('../models/match');

var returnFields = match.whitelist;
var population = [];

/**
 * create a new match.
 *
 * @desc  creates a new match and saves them
 *        in the database
 *
 * @param {Object}  matchData  Data for the match to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(matchData, cb) {
  debug('creating a new match');

  // Create match if is new.
  var matchModel  = new match(matchData);

  matchModel.save(function savematch(err, data) {
    if (err) {
      return cb(err);
    }

    exports.get({ _id: data._id }, function (err, match) {
      if(err) {
        return cb(err);
      }

      cb(null, match);

    });

  });

};

/**
 * delete a match
 *
 * @desc  delete data of the match with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deletematch(query, cb) {
  debug('deleting match: ', query);

  match
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deletematch(err, match) {
      if (err) {
        return cb(err);
      }

      if(!match) {
        return cb(null, {});
      }

      match.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, match);

      });

    });
};

/**
 * update a match
 *
 * @desc  update data of the match with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating match: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  match
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updatematch(err, match) {
      if(err) {
        return cb(err);
      }

      cb(null, match || {});
    });
};

/**
 * get a match.
 *
 * @desc get a match with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, toFilter, cb) {
  debug('getting match ', query);

  if(arguments.length < 3) {
    cb = toFilter;
    toFilter = true;
  }

  match
    .findOne(query, toFilter ? returnFields : null)
    .populate(population)
    .exec(function(err, match) {
      if(err) {
        return cb(err);
      }

      cb(null, match || {});
    });
};

/**
 * get a collection of matchs
 *
 * @desc get a collection of matchs from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of matchs');

  cb(null,
     match
      .find(query, returnFields)
      .populate(population)
      .stream({ transform: JSON.stringify }));

};

/**
 * get a collection of matchs using pagination
 *
 * @desc get a collection of matchs from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of matchs');

  var opts = {
    fields: returnFields,
    sort: qs.sort || {},
    populate: population,
    page: qs.page || 1,
    limit: qs.per_page || 10
  };

  match.paginate(query, opts, function (err, data){
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

