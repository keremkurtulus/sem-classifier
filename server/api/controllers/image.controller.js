/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable spaced-comment */
const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const httpStatus = require('http-status');
const path = require('path');
const multer = require('multer');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { imageService } = require('../services');
const { TENSOR_IMAGE_SIZE, MODEL_FOLDER_NAME } = require('./../../../settings');

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * @description To read image from filesystem and decode it for preparation for tensorflow library
 * @param {string} imgPath
 * @returns returned Tensor shape is [height, width, channels = 3]
 */
const readImage = imgPath => {
  const imageBuffer = fs.readFileSync(imgPath);
  const tfimage = tfnode.node.decodeImage(imageBuffer, 3);
  return tfimage;
};

const getShapedImage = imgElement => {
  const tensor = tf.image.resizeBilinear(imgElement, [
    TENSOR_IMAGE_SIZE,
    TENSOR_IMAGE_SIZE,
  ]);

  // Normalize the image from [0, 255] to [-1, 1].
  const offset = tf.scalar(127);
  const normalized = tensor.sub(offset).div(offset);

  // Reshape to a single-element batch so we can pass it to predict.
  const expended = normalized.expandDims(0);
  /* 
  const meanImageNetRGB = {
    red: 123.68,
    green: 116.779,
    blue: 103.939,
  };

  const indices = [
    tf.tensor1d([0], 'int32'),
    tf.tensor1d([1], 'int32'),
    tf.tensor1d([2], 'int32'),
  ];

  const centeredRGB = {
    red: tf
      .gather(tensor, indices[0], 2)
      .sub(tf.scalar(meanImageNetRGB.red))
      .reshape([109561]),
    green: tf
      .gather(tensor, indices[1], 2)
      .sub(tf.scalar(meanImageNetRGB.green))
      .reshape([109561]),
    blue: tf
      .gather(tensor, indices[2], 2)
      .sub(tf.scalar(meanImageNetRGB.blue))
      .reshape([109561]),
  };

  const processedTensor = tf
    .stack([centeredRGB.red, centeredRGB.green, centeredRGB.blue], 1)
    .reshape([TENSOR_IMAGE_SIZE, TENSOR_IMAGE_SIZE, 3])
    .reverse(2)
    .expandDims(0); */

  // console.log(expended.shape);
  /* 
  // Normalize the image from [0, 255] to [-1, 1].
  const offset = tf.scalar(127);
  const normalized = tensor.sub(offset).div(offset);

  // Reshape to a single-element batch so we can pass it to predict.
  const batched = normalized.expandDims(0);  */

  return expended;
};

const predictModel = async imagePath => {
  const model = await tf.loadGraphModel(
    `http://localhost:3000/keras/${MODEL_FOLDER_NAME}/model.json`,
  );
  let tensorImg = readImage(imagePath);

  tensorImg = getShapedImage(tensorImg);
  /* 
  tensorImg = tf.image
    .resizeBilinear(tensorImg, [331, 331])
    .div(tf.scalar(255));

  tensorImg = tf.cast(tensorImg, 'float32');
  tensorImg.expandDims(0);

  tensorImg
    .mean(2)
    .toFloat()
    .expandDims(0)
    .expandDims(-1);
 */
  const prediction = await model.predict(tensorImg).dataSync();

  console.log(prediction);

  // probability array of categaries
  const probabilities = prediction; /* prediction.map(
    p => Math.round((p + Number.EPSILON) * 100) / 100,
  ); // tf.softmax(prediction).dataSync(); */

  console.log('probabilities', probabilities);

  // get maximum argument of results
  const argMaxData = tf.argMax(probabilities).dataSync()[0];

  console.log('argMaxData', argMaxData);

  return [argMaxData, probabilities[argMaxData]];
};

// Just for test
(async () => {
  console.log('Result', await predictModel(`public/uploads/patterned.png`));
})();

const uploadAndClassify = catchAsync(async (req, res) => {
  // await sleep(1000);

  const categories = [
    'Bio',
    'Coated_Surface',
    'Fibres',
    'MEMS',
    'Nanowires',
    'Particles',
    'Patterned_Surface',
    'Porous_Sponge',
    'Powder',
    'Tips',
  ];

  const results = [];

  for (let index = 0; index < req.files.length; index++) {
    const file = req.files[index];
    const [argIndex, argValue] = await predictModel(
      `public/uploads/${file.filename}`,
    );
    results.push({
      fileName: file.filename,
      classificationResult: {
        label: categories[argIndex],
        value: argValue,
        valueAsPercentage: Number(argValue * 100).toFixed(0),
      },
    });
  }

  // const results = await imageService.uploadAndClassify(req.body);
  res.status(httpStatus.CREATED).send(results);
});

module.exports = {
  uploadAndClassify,
};
