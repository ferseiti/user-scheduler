const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.send(events);
};

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  console.log( req.body)
  await event.save(); //mongoose.model().save() 
  res.status(201).send(event);
};