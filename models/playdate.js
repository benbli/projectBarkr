var mongoose = require('mongoose');

var playdateSchema = mongoose.Schema({
  time: {type: String},
  location: {type: String},
  coordinates: {type: [Number]}, // [Long, Lat]
  }, { timestamps: true });

module.exports = mongoose.model('Playdate', playdateSchema);
