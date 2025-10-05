// routes/asteroidRoutes.js
const express = require('express');
const router = express.Router();
const asteroidController = require('../controllers/asteroidController');

// Get all asteroids with filtering
router.get('/', asteroidController.getAsteroids);

// Get asteroid by ID
router.get('/:id', asteroidController.getAsteroidById);

// Get NEO feed (weekly overview)
router.get('/feed/weekly', asteroidController.getFeed);

module.exports = router;