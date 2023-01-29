import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadPromo, loadCameras } from './action';

import { APIRoute } from '../const';

import { AppDispatch, State } from '../types/store';
import { Promo } from '../types/promo';
import { Cameras } from '../types/cameras';

export const fetchPromoAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchPromo', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Promo>(APIRoute.Promo);
  dispatch(loadPromo(data));
});

export const fetchCamerasAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchCameras', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Cameras>(APIRoute.Cameras);
  dispatch(loadCameras(data));
});
