const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Predict images
 * @param {Object} reqBody
 * @returns {Promise<User>}
 */
const uploadAndClassify = async reqBody => {
  if (false) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please choose an image lower 10mb size',
    );
  }

  return {
    images: ['/public/uploads/IMAGE-1619982890077.png'],
    nanowire: 0.32,
  };
};

module.exports = {
  uploadAndClassify,
};
