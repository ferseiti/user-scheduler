const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.get('/events', eventController.getEvents);
router.post('/events', eventController.createEvent);

module.exports = router;