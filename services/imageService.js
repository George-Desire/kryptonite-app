const Image = require('../models/image');
const fs = require('fs');

class ImageService {
    async uploadImage(userId, file) {
        const base64Image = fs.readFileSync(file.path, { encoding: 'base64' });
        const image = new Image({ userId, base64Image });
        await image.save();
        fs.unlinkSync(file.path); // Delete the file from the system
        return image;
    }

    async getAllImages() {
        return Image.find();
    }

    async getImageById(imageId) {
        return Image.findById(imageId);
    }
}

module.exports = new ImageService();
