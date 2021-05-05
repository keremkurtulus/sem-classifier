const Joi = require('joi');

const uploadAndClassify = {
  body: Joi.object().keys({
    images: Joi.array().required(),
  }),
};

module.exports = {
  uploadAndClassify,
};
