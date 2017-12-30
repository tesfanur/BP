
var mongoose  = require('mongoose');
var moment    = require('moment');
var paginator = require('mongoose-paginate');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  picture:        { type: String, default: '' },
  phone_number:   { type: Number},
  email:          { type: String}, 
  sex:            { type: String, default: 'M'}, 
  first_name:     { type: String},
  last_name:      { type: String},
  date_created:   { type: Date},
  last_modified:  { type: Date}
});

// add mongoose-troop middleware to support pagination
ProfileSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc  - Sets the date_created and last_modified
 *          attributes prior to save.
 *        - Hash tokens password.
 */
ProfileSchema.pre('save', function preSaveMiddleware(next) {
  var token = this;

  // set date modifications
  var now = moment().toISOString();

  token.date_created = now;
  token.last_modified = now;

  next();

});

/**
 * Profile Attributes to expose
 */
ProfileSchema.statics.whitelist = {
  _id: 1,
  date_created:   1,
  user: 1,
  phone_number: 1,
  email:  1,
  picture: 1,
  first_name: 1,
  last_name: 1,
  last_modified: 1
};


// Expose Profile Profile
module.exports = mongoose.model('Profile', ProfileSchema);
