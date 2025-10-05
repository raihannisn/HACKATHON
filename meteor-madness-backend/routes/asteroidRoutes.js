// routes/asteroidRoutes.js
const express = require('express');
const router = express.Router();
const asteroidController = require('../controllers/asteroidController');

// Get all asteroids with filtering
router.get('/', asteroidController.getAsteroids);

// Get NEO feed (weekly overview) - PINDAH KE ATAS!
router.get('/feed/weekly', asteroidController.getFeed);

// Get asteroid by ID - PINDAH KE BAWAH!
router.get('/:id', asteroidController.getAsteroidById);

module.exports = router;