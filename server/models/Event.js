const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  Servidor: String,
  Username: String,
  StartTime: Date,
  EndTime: Date,
  Description: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;