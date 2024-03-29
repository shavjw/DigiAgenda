const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/event');
const cors = require('cors'); // Import the cors package
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //connects variables in config.env to global node enviroment

const app = express();
const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// Middleware
app.use(express.json());

// API routes
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/events/:startDate', async (req, res) => {
  try {
    const startDate = req.params.startDate;

    const event = await Event.findOneAndDelete({ start: startDate });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
