/*
 *
 * Main actions
 *
 */

import {
  CHANGE_IMAGES,
  CLASSIFY_IMAGES,
  CLASSIFY_IMAGES_ERROR,
  CLASSIFY_IMAGES_SUCCESS,
  LOAD_UPLOADED_IMAGES,
  LOAD_UPLOADED_IMAGES_SUCCESS,
} from './constants';

/**
 *
 * @param {array} images
 * @returns
 */
export function changeImages(images) {
  return {
    type: CHANGE_IMAGES,
    images,
  };
}

/**
 * @returns
 */
export function classifyImages() {
  return {
    type: CLASSIFY_IMAGES,
  };
}

/**
 * @param {object} results
 * @returns
 */
export function classifyImagesDone(results) {
  return {
    type: CLASSIFY_IMAGES_SUCCESS,
    results,
  };
}

/**
 * @param {error} error
 * @returns
 */
export function classifyImagesFailed(error) {
  return {
    type: CLASSIFY_IMAGES_ERROR,
    error,
  };
}

/**
 * @description Get previosly uploaded images from local storage
 * @returns {Array}
 */
export function loadUploadedImages() {
  return {
    type: LOAD_UPLOADED_IMAGES,
  };
}

/**
 * @description Update result state for loaded images
 * @returns {Array}
 */
export function loadUploadedImagesDone(results) {
  return {
    type: LOAD_UPLOADED_IMAGES_SUCCESS,
    results,
  };
}
