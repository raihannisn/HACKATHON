// routes/simulationRoutes.js
const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');

// Simulate asteroid impact
router.post('/simulate', simulationController.simulateImpact);

// Get impact scenarios for multiple locations
router.post('/batch-simulate', simulationController.batchSimulate);

module.exports = router;