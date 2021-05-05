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
