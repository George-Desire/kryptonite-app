const User = require('../models/user');
const crypto = require('crypto');

class ApiKeyService {
    async generateApiKey(userId) {
        const apiKey = crypto.randomBytes(32).toString('hex');
        await User.findByIdAndUpdate(userId, { apiKey });
        return apiKey;
    }

    async invalidateApiKey(userId, apiKey) {
        await User.findOneAndUpdate({ _id: userId, apiKey }, { apiKey: null });
    }
}

module.exports = new ApiKeyService();
