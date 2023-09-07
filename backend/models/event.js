const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
});

module.exports = mongoose.model('Event', eventSchema);
