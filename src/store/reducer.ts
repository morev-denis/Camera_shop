import { createReducer } from '@reduxjs/toolkit';

import { getPromo } from './action';

import { Promo } from '../types/promo';

type InitialState = {
  promo: Promo | null;
};

const initialState: InitialState = {
  promo: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getPromo, (state, action) => {
    state.promo = action.payload;
  });
});

export { reducer };
