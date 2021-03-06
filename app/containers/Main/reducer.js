/*
 *
 * Main reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_IMAGES,
  CLASSIFY_IMAGES,
  CLASSIFY_IMAGES_ERROR,
  CLASSIFY_IMAGES_SUCCESS,
  CLEAR_UPLOADED_IMAGES,
  CLEAR_UPLOADED_IMAGES_SUCCESS,
  LOAD_UPLOADED_IMAGES,
  LOAD_UPLOADED_IMAGES_SUCCESS,
} from './constants';

export const initialState = {
  images: [],
  results: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const mainReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_IMAGES:
        draft.images = action.images;
        break;
      case CLASSIFY_IMAGES:
        draft.loading = true;
        draft.error = false;
        break;
      case CLASSIFY_IMAGES_SUCCESS:
        draft.results = action.results;
        draft.loading = false;
        draft.error = false;
        break;
      case CLASSIFY_IMAGES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_UPLOADED_IMAGES:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_UPLOADED_IMAGES_SUCCESS:
        draft.results = action.results;
        draft.loading = false;
        draft.error = false;
        break;
      case CLEAR_UPLOADED_IMAGES:
        draft.loading = true;
        draft.error = false;
        break;
      case CLEAR_UPLOADED_IMAGES_SUCCESS:
        draft.results = [];
        draft.loading = false;
        draft.error = false;
        break;
    }
  });

export default mainReducer;
