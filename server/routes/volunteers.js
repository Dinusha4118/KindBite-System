const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

// Get optimized route
router.post('/route', async (req, res) => {
  const { origin, destination, waypoints } = req.body;

  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        waypoints: waypoints.join('|'), // Format waypoints for API
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get nearby tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'Pending' });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign task to volunteer
router.post('/tasks/assign', async (req, res) => {
  const { taskId, volunteerId } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: 'Assigned', assignedTo: volunteerId },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track impact
router.get('/impact', async (req, res) => {
  // Example logic to calculate impact
  const completedTasks = await Task.countDocuments({ status: 'Completed' });
  res.json({ completedTasks });
});

module.exports = router;
