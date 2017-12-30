// Access Layer for profile Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-profile');
var moment  = require('moment');
var _       = require('lodash');

var profile        = require('../models/profile');

var returnFields = profile.whitelist;
var population = [];

/**
 * create a new profile.
 *
 * @desc  creates a new profile and saves them
 *        in the database
 *
 * @param {Object}  profileData  Data for the profile to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(profileData, cb) {
  debug('creating a new profile');

  // Create profile if is new.
  var profileModel  = new profile(profileData);

  profileModel.save(function saveprofile(err, data) {
    if (err) {
      return cb(err);
    }

    exports.get({ _id: data._id }, function (err, profile) {
      if(err) {
        return cb(err);
      }

      cb(null, profile);

    });

  });

};

/**
 * delete a profile
 *
 * @desc  delete data of the profile with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteprofile(query, cb) {
  debug('deleting profile: ', query);

  profile
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteprofile(err, profile) {
      if (err) {
        return cb(err);
      }

      if(!profile) {
        return cb(null, {});
      }

      profile.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, profile);

      });

    });
};

/**
 * update a profile
 *
 * @desc  update data of the profile with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating profile: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  profile
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateprofile(err, profile) {
      if(err) {
        return cb(err);
      }

      cb(null, profile || {});
    });
};

/**
 * get a profile.
 *
 * @desc get a profile with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, toFilter, cb) {
  debug('getting profile ', query);

  if(arguments.length < 3) {
    cb = toFilter;
    toFilter = true;
  }

  profile
    .findOne(query, toFilter ? returnFields : null)
    .populate(population)
    .exec(function(err, profile) {
      if(err) {
        return cb(err);
      }

      cb(null, profile || {});
    });
};

/**
 * get a collection of profiles
 *
 * @desc get a collection of profiles from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of profiles');

  cb(null,
     profile
      .find(query, returnFields)
      .populate(population)
      .stream({ transform: JSON.stringify }));

};

/**
 * get a collection of profiles using pagination
 *
 * @desc get a collection of profiles from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of profiles');

  var opts = {
    fields: returnFields,
    sort: qs.sort || {},
    populate: population,
    page: qs.page || 1,
    limit: qs.per_page || 10
  };

  profile.paginate(query, opts, function (err, data){
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

