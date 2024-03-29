import { createAction } from '@reduxjs/toolkit';

import { Promo } from '../types/promo';
import { Cameras } from '../types/cameras';
import { Camera } from '../types/camera';
import { Reviews } from '../types/reviews';

export const loadPromo = createAction('loadPromo', (value: Promo) => ({ payload: value }));

export const loadCameras = createAction('loadCameras', (value: Cameras) => ({ payload: value }));

export const loadSortedCameras = createAction('loadSortedCameras', (value: Cameras) => ({
  payload: value,
}));

export const loadCamera = createAction('loadCamera', (value: Camera) => ({ payload: value }));

export const loadSimilarCameras = createAction('loadSimilarCameras', (value: Cameras) => ({
  payload: value,
}));

export const getMinPriceOfCameras = createAction('getMinPriceOfCameras', (value: number) => ({
  payload: value,
}));

export const getMaxPriceOfCameras = createAction('getMaxPriceOfCameras', (value: number) => ({
  payload: value,
}));

export const getMinPriceOfCamerasFiltered = createAction(
  'getMinPriceOfCamerasFiltered',
  (value: number) => ({
    payload: value,
  }),
);

export const getMaxPriceOfCamerasFiltered = createAction(
  'getMaxPriceOfCamerasFiltered',
  (value: number) => ({
    payload: value,
  }),
);

export const addCameraToBasket = createAction(
  'addCameraToBasket',
  (value: { id: number; count: number }) => ({
    payload: value,
  }),
);

export const changeBasketItemCount = createAction(
  'changeBasketItemCount',
  (value: { id: number; count: number }) => ({ payload: value }),
);

export const deleteItem = createAction('deleteItem', (value: { id: number; count: number }) => ({
  payload: value,
}));

export const loadReviews = createAction('loadReviews', (value: Reviews) => ({ payload: value }));

export const postReview = createAction('postReview');

export const setDiscount = createAction('setDiscount', (value: number) => ({ payload: value }));
export const setCoupon = createAction('setCoupon', (value: string) => ({ payload: value }));

export const setValidDiscount = createAction('setValidDiscount', (value: boolean) => ({
  payload: value,
}));
export const setInvalidDiscount = createAction('setInvalidDiscount', (value: boolean) => ({
  payload: value,
}));

export const increaseReviewsCount = createAction('increaseReviewsCount');
