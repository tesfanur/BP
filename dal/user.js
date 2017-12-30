// Access Layer for User Data.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-user');
var moment  = require('moment');
var _       = require('lodash');

var User        = require('../models/user');

var returnFields = User.whitelist;
var population = [];

/**
 * create a new user.
 *
 * @desc  creates a new user and saves them
 *        in the database
 *
 * @param {Object}  userData  Data for the user to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(userData, cb) {
  debug('creating a new user');

  // Create user if is new.
  var userModel  = new User(userData);

  userModel.save(function saveUser(err, data) {
    if (err) {
      return cb(err);
    }

    exports.get({ _id: data._id }, function (err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user);

    });

  });

};

/**
 * delete a user
 *
 * @desc  delete data of the user with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteUser(query, cb) {
  debug('deleting user: ', query);

  User
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteUser(err, user) {
      if (err) {
        return cb(err);
      }

      if(!user) {
        return cb(null, {});
      }

      user.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, user);

      });

    });
};

/**
 * update a user
 *
 * @desc  update data of the user with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating user: ', query);

  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  User
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateUser(err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user || {});
    });
};

/**
 * get a user.
 *
 * @desc get a user with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, toFilter, cb) {
  debug('getting user ', query);

  if(arguments.length < 3) {
    cb = toFilter;
    toFilter = true;
  }

  User
    .findOne(query, toFilter ? returnFields : null)
    .populate(population)
    .exec(function(err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user || {});
    });
};

/**
 * get a collection of users
 *
 * @desc get a collection of users from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, qs, cb) {
  debug('fetching a collection of users');

  cb(null,
     User
      .find(query, returnFields)
      .populate(population)
      .stream({ transform: JSON.stringify }));

};

/**
 * get a collection of users using pagination
 *
 * @desc get a collection of users from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, qs, cb) {
  debug('fetching a collection of users');

  var opts = {
    fields: returnFields,
    sort: qs.sort || {},
    populate: population,
    page: qs.page || 1,
    limit: qs.per_page || 10
  };

  User.paginate(query, opts, function (err, data){
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


/**
 * Hash password
 */
exports.hashPasswd = function hashPasswd(passwd, cb) {
  User.hashPasswd(passwd, cb);
};
