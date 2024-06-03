const express = require('express');
const multer = require('multer');
const router = express.Router();
const ImageController = require('../controllers/imageController');
const ApiKeyMiddleware = require('../middleware/apiKeyMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', ApiKeyMiddleware, upload.single('image'), ImageController.uploadImage);
router.get('/images', ImageController.getAllImages);
router.get('/images/:id', ImageController.getImageById);

module.exports = router;
