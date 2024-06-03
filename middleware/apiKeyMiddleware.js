const User = require('../models/user');

module.exports = async (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey) return res.status(401).json({ message: 'Access denied. No API key provided.' });

    try {
        const user = await User.findOne({ apiKey });
        if (!user) return res.status(400).json({ message: 'Invalid API key.' });

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};
