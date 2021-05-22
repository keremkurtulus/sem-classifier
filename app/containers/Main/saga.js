/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectImages } from './selectors';
import { CLASSIFY_IMAGES, LOAD_UPLOADED_IMAGES } from './constants';
import {
  changeImages,
  classifyImagesDone,
  classifyImagesFailed,
  loadUploadedImagesDone,
} from './actions';

/**
 * Classify images
 */
export function* classify() {
  // Select images from store
  const images = yield select(makeSelectImages());
  const requestURL = `/api/v1/images/uploadAndClassify`;

  const formData = new FormData();

  images.map(img => {
    formData.append('images', img.file);
  });

  try {
    // Call our request helper (see 'utils/request')
    const results = (yield call(request, {
      method: 'post',
      url: requestURL,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })).data;

    // Get old results from local storage and concat with new results from server
    const oldAndNewImages = yield call(async () => {
      let oldImages = JSON.parse(await localStorage.getItem('SAVED_IMAGES'));

      if (oldImages) {
        oldImages.push(results);
      } else {
        oldImages = [results];
      }

      await localStorage.setItem('SAVED_IMAGES', JSON.stringify(oldImages));
      return oldImages;
    });

    console.log('oldAndNewImages', oldAndNewImages);

    yield put(classifyImagesDone(oldAndNewImages));
    yield put(changeImages([]));
  } catch (err) {
    console.log('err', err);
    yield put(
      classifyImagesFailed(
        'Please check size of your images if exceed 1mb limit',
      ),
    );
  }
}

/**
 * Load uploaded images
 */
export function* sagaLoadUploadedImages() {
  try {
    const oldResults = yield call(async () => {
      const oldImages = JSON.parse(await localStorage.getItem('SAVED_IMAGES'));
      return oldImages || [];
    });

    yield put(loadUploadedImagesDone(oldResults));
  } catch (err) {}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* mainSaga() {
  yield takeLatest(CLASSIFY_IMAGES, classify);
  yield takeLatest(LOAD_UPLOADED_IMAGES, sagaLoadUploadedImages);
}
