import { createAction } from '@reduxjs/toolkit';

import { Promo } from '../types/promo';
import { Cameras } from '../types/cameras';
import { Camera } from '../types/camera';
import { Reviews } from '../types/reviews';

export const loadPromo = createAction('loadPromo', (value: Promo) => ({ payload: value }));

export const loadCameras = createAction('loadCameras', (value: Cameras) => ({ payload: value }));

export const loadCamera = createAction('loadCamera', (value: Camera) => ({ payload: value }));

export const loadSimilarCameras = createAction('loadSimilarCameras', (value: Cameras) => ({
  payload: value,
}));

export const loadReviews = createAction('loadReviews', (value: Reviews) => ({ payload: value }));

export const postReview = createAction('postReview');

export const increaseReviewsCount = createAction('increaseReviewsCount');
