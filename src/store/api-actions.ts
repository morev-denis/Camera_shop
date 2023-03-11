import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  loadPromo,
  loadCameras,
  loadSortedCameras,
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
  try {
    const { data } = await api.get<Promo>(APIRoute.Promo);
    dispatch(loadPromo(data));
  } catch (error) {
    toast.error('Не удалось загрузить данные промо акции. Попробуйте позже');
    throw error;
  }
});

export const fetchCamerasAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchCameras', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Cameras>(APIRoute.Cameras);
    dispatch(loadCameras(data));
  } catch (error) {
    toast.error('Не удалось загрузить данные камер. Попробуйте позже');
    throw error;
  }
});

export const fetchSortedCamerasAction = createAsyncThunk<
  void,
  {
    _sort: string | null;
    _order: string | null;
    category: string[] | null;
    type: string[] | null;
    level: string[] | null;
  },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchSortedCameras', async (paramsSort, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        _sort: paramsSort._sort,
        _order: paramsSort._order,
        category: paramsSort.category,
        type: paramsSort.type,
        level: paramsSort.level,
      },
    });
    dispatch(loadSortedCameras(data));
  } catch (error) {
    toast.error('Не удалось загрузить данные камер. Попробуйте позже');
    throw error;
  }
});

export const fetchCameraAction = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchCamera', async (cameraId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
    dispatch(loadCamera(data));
  } catch (error) {
    toast.error('Не удалось загрузить данные камеры. Попробуйте позже');
    throw error;
  }
});

export const fetchSimilarCamerasAction = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchSimilarCameras', async (cameraId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Cameras>(`${APIRoute.Cameras}/${cameraId}/similar`);
    dispatch(loadSimilarCameras(data));
  } catch (error) {
    toast.error('Не удалось загрузить данные похожи камер. Попробуйте позже');
    throw error;
  }
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchReviews', async (cameraId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/reviews`);
    dispatch(loadReviews(data));
  } catch (error) {
    toast.error('Не удалось загрузить данные комментариев. Попробуйте позже');
    throw error;
  }
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
    try {
      await api.post<ReviewPost>(APIRoute.Reviews, {
        userName,
        advantage,
        disadvantage,
        review,
        rating,
        cameraId,
      });
      dispatch(postReview());
    } catch (error) {
      toast.error('Не удалось отправить комментарий. Попробуйте позже');
      throw error;
    }
  },
);
