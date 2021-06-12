const express = require('express');
const path = require('path');
const multer = require('multer');
const imageController = require('../../controllers/image.controller');
const {
  MAX_IMAGE_UPLOAD_COUNT,
  MAX_IMAGE_UPLOAD_SIZE,
} = require('../../../../settings');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_UPLOAD_SIZE * 1000000 },
}).array('images', MAX_IMAGE_UPLOAD_COUNT);

router
  .route('/uploadAndClassify')
  .post(upload, imageController.uploadAndClassify);

module.exports = router;
