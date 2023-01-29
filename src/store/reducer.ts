import { createReducer } from '@reduxjs/toolkit';

import { loadPromo, loadCameras, loadCamera, loadReviews, loadSimilarCameras } from './action';

import { Promo } from '../types/promo';
import { Cameras } from '../types/cameras';
import { Camera } from '../types/camera';
import { Reviews } from '../types/reviews';

type InitialState = {
  promo: Promo | null;
  cameras: Cameras | null;
  camera: Camera | null;
  reviews: Reviews | null;
  similarCameras: Cameras | null;
};

const initialState: InitialState = {
  promo: null,
  cameras: null,
  camera: null,
  reviews: null,
  similarCameras: null,
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
    });
});

export { reducer };
