const express = require('express');
const { handleGenerateShortUrl, handleGetRedirected, handleGetAnalyti } = require('../controllers/url');

// Create express router
const router = express.Router();

// Routes
router.post('/', handleGenerateShortUrl);
router.get('/:shortId', handleGetRedirected);
router.get('/:shortId/analytics', handleGetAnalyti);

// Exporting the router
module.exports = router;