const UserService = require('../services/userService');
const EmailService = require('../services/emailService');

class AuthController {
    async register(req, res) {
        try {
            const { email, voiceSample, biometricData } = req.body;
            const user = await UserService.register(email, voiceSample, biometricData);
            await EmailService.sendEmail(email, 'Welcome to KryptoniteApp', 'Thank you for registering!');
            res.status(201).json({ message: 'Registration successful. Please check your email to confirm.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email } = req.body;
            const otp = await UserService.login(email);
            await EmailService.sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);
            res.status(200).json({ message: 'OTP sent to your email.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            const token = await UserService.verifyOtp(email, otp);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
