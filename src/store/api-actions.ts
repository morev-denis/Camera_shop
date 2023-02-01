import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  loadPromo,
  loadCameras,
  loadCamera,
  loadReviews,
  loadSimilarCameras,
  postReview,
} from './action';

import { APIRoute } from '../const';

import { AppDispatch, State } from '../types/store';
import { Promo } from '../types/promo';
import { Cameras } from '../types/cameras';
import { Camera } from '../types/camera';
import { Reviews } from '../types/reviews';
import { ReviewPost } from '../types/review-post';

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

export const fetchCameraAction = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchCamera', async (cameraId, { dispatch, extra: api }) => {
  const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
  dispatch(loadCamera(data));
});

export const fetchSimilarCamerasAction = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchSimilarCameras', async (cameraId, { dispatch, extra: api }) => {
  const { data } = await api.get<Cameras>(`${APIRoute.Cameras}/${cameraId}/similar`);
  dispatch(loadSimilarCameras(data));
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchReviews', async (cameraId, { dispatch, extra: api }) => {
  const { data } = await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/reviews`);
  dispatch(loadReviews(data));
});

export const postReviewAction = createAsyncThunk<
  void,
  ReviewPost,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'postReview',
  async (
    { userName, advantage, disadvantage, review, rating, cameraId },
    { dispatch, extra: api },
  ) => {
    await api.post<ReviewPost>(APIRoute.Reviews, {
      userName,
      advantage,
      disadvantage,
      review,
      rating,
      cameraId,
    });
    dispatch(postReview());
  },
);
