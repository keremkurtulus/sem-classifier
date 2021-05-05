const express = require('express');
const path = require('path');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const imageValidation = require('../../validations/image.validation');
const imageController = require('../../controllers/image.controller');
const { MAX_IMAGE_UPLOAD_COUNT } = require('../../../../settings');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
}).array('images', MAX_IMAGE_UPLOAD_COUNT);

router
  .route('/uploadAndClassify')
  .post(upload, imageController.uploadAndClassify);

module.exports = router;
