import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPromo } from './action';

import { APIRoute } from '../const';

import { AppDispatch, State } from '../types/store';
import { Promo } from '../types/promo';

export const fetchPromoAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchPromo', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Promo>(APIRoute.Promo);
  dispatch(getPromo(data));
});
