/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable spaced-comment */
const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { TENSOR_IMAGE_SIZE, MODEL_FOLDER_NAME } = require('./../../../settings');

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

/**
 * @description To reshape the image for expected options of our model
 * @param {tf.Tensor3D} imgElement
 * @returns
 */
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

  return expended;
};

const predictModel = async imagePath => {
  const model = await tf.loadGraphModel(
    `http://localhost:3000/keras/${MODEL_FOLDER_NAME}/model.json`,
  );
  let tensorImg = readImage(imagePath);
  tensorImg = getShapedImage(tensorImg);
  const prediction = await model.predict(tensorImg).dataSync();

  // probability array of categories
  const probabilities = prediction;

  console.log('probabilities', probabilities);

  // get maximum argument of results
  const argMaxData = tf.argMax(probabilities).dataSync()[0];

  console.log('argMaxData', argMaxData);

  return [argMaxData, probabilities[argMaxData]];
};

// Just for test
/* (async () => {
  console.log('Result', await predictModel(`public/uploads/patterned.png`));
})(); */

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

  res.status(httpStatus.CREATED).send(results);
});

module.exports = {
  uploadAndClassify,
};
