// server.js - Entry Point
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const asteroidRoutes = require('./routes/asteroidRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const mitigationRoutes = require('./routes/mitigationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/asteroids', asteroidRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/mitigation', mitigationRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: '🚀 Meteor Madness Backend Active',
    timestamp: new Date(),
    endpoints: {
      asteroids: '/api/asteroids',
      asteroid_detail: '/api/asteroids/:id',
      simulate: '/api/simulation/simulate',
      mitigation: '/api/mitigation/:id',
      feed: '/api/asteroids/feed'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Meteor Madness Backend running on http://localhost:${PORT}`);
  console.log(`🌠 NASA API configured`);
  console.log(`📡 Ready to simulate asteroid impacts!`);
});

module.exports = app;