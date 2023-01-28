import { createReducer } from '@reduxjs/toolkit';

import { Promo } from '../types/promo';

type InitialState = {
  promo: Promo | null;
};

const initialState: InitialState = {
  promo: null,
};

const reducer = createReducer(initialState, (builder) => {
  //
});

export { reducer };
