const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/authMiddleware');
const ApiKeyController = require('../controllers/apiKeyController');

router.post('/generate-api-key', AuthMiddleware, ApiKeyController.generateApiKey);
router.post('/invalidate-api-key', AuthMiddleware, ApiKeyController.invalidateApiKey);

module.exports = router;
