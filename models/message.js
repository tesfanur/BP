//Message 
var mongoose  = require('mongoose');
var moment    = require('moment');
var paginator = require('mongoose-paginate');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  from:           { type: Schema.Types.ObjectId, ref: 'User' },
  to:             { type: Schema.Types.ObjectId, ref: 'User' },
  subject:        { type: String},
  content:        { type: String}, 
  date_created:   { type: Date},
  last_modified:  { type: Date}
});

// add mongoose-troop middleware to support pagination
MessageSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc  - Sets the date_created and last_modified
 *          attributes prior to save.
 *        - Hash tokens password.
 */
MessageSchema.pre('save', function preSaveMiddleware(next) {
  var token = this;

  // set date modifications
  var now = moment().toISOString();

  token.date_created = now;
  token.last_modified = now;

  next();

});

/**
 * Message Attributes to expose
 */
MessageSchema.statics.whitelist = {
  _id:        1,
  from:       1,
  to:         1,
  content:    1,
  last_name:  1,
  last_modified: 1
};


// Expose Message Message
module.exports = mongoose.model('Message', MessageSchema);
