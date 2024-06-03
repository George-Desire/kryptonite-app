const ApiKeyService = require('../services/apiKeyService');

class ApiKeyController {
    async generateApiKey(req, res) {
        try {
            const userId = req.user.id;
            const apiKey = await ApiKeyService.generateApiKey(userId);
            res.status(200).json({ apiKey });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async invalidateApiKey(req, res) {
        try {
            const userId = req.user.id;
            const { apiKey } = req.body;
            await ApiKeyService.invalidateApiKey(userId, apiKey);
            res.status(200).json({ message: 'API key invalidated.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ApiKeyController();
