/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectImages } from './selectors';
import { CLASSIFY_IMAGES } from './constants';
import {
  changeImages,
  classifyImagesDone,
  classifyImagesFailed,
} from './actions';

/**
 * Github repos request/response handler
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
    const results = yield call(request, {
      method: 'post',
      url: requestURL,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    yield put(classifyImagesDone(results));
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
 * Root saga manages watcher lifecycle
 */

export default function* mainSaga() {
  yield takeLatest(CLASSIFY_IMAGES, classify);
}
