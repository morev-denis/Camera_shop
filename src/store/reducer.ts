import { createReducer } from '@reduxjs/toolkit';

import { loadPromo, loadCameras } from './action';

import { Promo } from '../types/promo';
import { Cameras } from '../types/cameras';

type InitialState = {
  promo: Promo | null;
  cameras: Cameras | null;
};

const initialState: InitialState = {
  promo: null,
  cameras: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadCameras, (state, action) => {
      state.cameras = action.payload;
    });
});

export { reducer };
