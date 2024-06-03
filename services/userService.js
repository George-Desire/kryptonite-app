const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient({ url: process.env.REDIS_URL });

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

class UserService {
    async register(email, voiceSample, biometricData) {
        const user = new User({ email, voiceSample, biometricData });
        await user.save();
        return user;
    }

    async login(email) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await setAsync(email, otp, 'EX', 300); // OTP expires in 5 minutes
        return otp;
    }

    async verifyOtp(email, otp) {
        const storedOtp = await getAsync(email);
        if (otp !== storedOtp) throw new Error('Invalid OTP');

        const user = await User.findOne({ email });
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}

module.exports = new UserService();
