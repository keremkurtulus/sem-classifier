module.exports = {
  /**
   * Maximum number of image classified at the same time
   */
  MAX_IMAGE_UPLOAD_COUNT: 5,
  /**
   * Maximum accaptable size of image to upload in MB each
   */
  MAX_IMAGE_UPLOAD_SIZE: 5,
  /**
   * Accaptable image types
   */
  ACCEPTABLE_IMAGE_TYPES: /jpeg|jpg|png|gif|tif/,
  /**
   * The image size accapted by the model
   */
  TENSOR_IMAGE_SIZE: 331,
  /**
   * The name of the model folder into the public/keras
   */
  MODEL_FOLDER_NAME: 'model5',
};
