// Server-side (Node.js + Express.js + MongoDB)
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/user-scheduler', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to MongoDB!");
});

const eventSchema = new mongoose.Schema({
  Subject: String,
  StartTime: Date,
  EndTime: Date
});

const Event = mongoose.model('Event', eventSchema);

app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

app.listen(5000, () => console.log('Server started on port 5000'));