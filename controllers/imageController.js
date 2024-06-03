const ImageService = require('../services/imageService');

class ImageController {
    async uploadImage(req, res) {
        try {
            const userId = req.user.id;
            const file = req.file;
            const image = await ImageService.uploadImage(userId, file);
            res.status(201).json({ message: 'Image uploaded successfully.', image });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllImages(req, res) {
        try {
            const images = await ImageService.getAllImages();
            res.status(200).json(images);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getImageById(req, res) {
        try {
            const { id } = req.params;
            const image = await ImageService.getImageById(id);
            res.status(200).json(image);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ImageController();
