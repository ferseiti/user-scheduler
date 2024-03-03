const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.send(events);
};

exports.createEvent = async (req, res) => {
  console.log(req.body);
  const event = new Event(req.body);
  await event.save(); //mongoose.model().save() 
  res.status(201).send(event);
};

exports.updateEvent = async (req, res) => {
  console.log(req.params)
  const event = await Event.findByIdAndUpdate(req.params.id, req.body);
  res.send(req.params.id);
};

exports.deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  res.send(event);
}