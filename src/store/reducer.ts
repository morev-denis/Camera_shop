import { createReducer } from '@reduxjs/toolkit';

import {
  loadPromo,
  loadCameras,
  loadCamera,
  loadReviews,
  loadSimilarCameras,
  increaseReviewsCount,
} from './action';

import { InitialState } from '../types/initial-state';

import { REVIEWS_COUNT } from '../const';

const initialState: InitialState = {
  promo: null,
  cameras: null,
  camera: null,
  reviews: null,
  similarCameras: null,
  reviewsCount: REVIEWS_COUNT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadCameras, (state, action) => {
      state.cameras = action.payload;
    })
    .addCase(loadCamera, (state, action) => {
      state.camera = action.payload;
    })
    .addCase(loadSimilarCameras, (state, action) => {
      state.similarCameras = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(increaseReviewsCount, (state) => {
      state.reviewsCount += REVIEWS_COUNT;
    });
});

export { reducer };
