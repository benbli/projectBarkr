var mongoose = require('mongoose');

var playdateSchema = mongoose.Schema({
  time: {type: String},
  location: {type: String}
  }, { timestamps: true });

module.exports = mongoose.model('Playdate', playdateSchema);
