const express = require('express');
const { getAIResponse } = require('../controllers/aiController');
const authMiddleware = require('../middleware/userAuth');

const router = express.Router();

// AI chat endpoint - requires authentication
router.post('/chat', authMiddleware, getAIResponse);

module.exports = router;
