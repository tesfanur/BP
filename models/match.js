//Match 
var mongoose  = require('mongoose');
var moment    = require('moment');
var paginator = require('mongoose-paginate');

var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  male:           { type: Schema.Types.ObjectId, ref: 'User' },
  female:         { type: Schema.Types.ObjectId, ref: 'User' },
  percent_of_match:        { type: Number},
  communicating:  { type: Boolean},
  date_created:   { type: Date},
  last_modified:  { type: Date}
});

// add mongoose-troop middleware to support pagination
MatchSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc  - Sets the date_created and last_modified
 *          attributes prior to save.
 *        - Hash tokens password.
 */
MatchSchema.pre('save', function preSaveMiddleware(next) {
  var token = this;

  // set date modifications
  var now = moment().toISOString();

  token.date_created = now;
  token.last_modified = now;

  next();

});

/**
 * Match Attributes to expose
 */
MatchSchema.statics.whitelist = {
  _id:              1,
  male:             1,
  female:           1,
  percent_of_match: 1,
  communicating:    1,
  last_name:        1,
  last_modified:    1
};


// Expose Match Match
module.exports = mongoose.model('Match', MatchSchema);
