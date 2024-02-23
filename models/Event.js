const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  Subject: String,
  StartTime: Date,
  EndTime: Date,
  IsAllDay: Boolean,
  Location: String,
  Description: String,
  RecurrenceRule: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;