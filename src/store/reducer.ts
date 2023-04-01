import { createReducer } from '@reduxjs/toolkit';

import {
  loadPromo,
  loadCameras,
  loadCamera,
  loadReviews,
  loadSimilarCameras,
  increaseReviewsCount,
  loadSortedCameras,
  getMinPriceOfCameras,
  getMaxPriceOfCameras,
  getMinPriceOfCamerasFiltered,
  getMaxPriceOfCamerasFiltered,
  addCameraToBasket,
  changeBasketItemCount,
  deleteItem,
} from './action';

import { InitialState } from '../types/initial-state';

import { REVIEWS_COUNT } from '../const';

const initialState: InitialState = {
  promo: null,
  cameras: null,
  camera: null,
  reviews: null,
  similarCameras: null,
  reviewsCount: REVIEWS_COUNT,
  queryParams: {
    _sort: '',
    _order: '',
  },
  minPrice: 0,
  maxPrice: 0,
  minPriceFiltered: 0,
  maxPriceFiltered: 0,
  basket: [],
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
    })
    .addCase(increaseReviewsCount, (state) => {
      state.reviewsCount += REVIEWS_COUNT;
    })
    .addCase(loadSortedCameras, (state, action) => {
      state.cameras = action.payload;
    })
    .addCase(getMinPriceOfCameras, (state, action) => {
      state.minPrice = action.payload;
    })
    .addCase(getMaxPriceOfCameras, (state, action) => {
      state.maxPrice = action.payload;
    })
    .addCase(getMinPriceOfCamerasFiltered, (state, action) => {
      state.minPriceFiltered = action.payload;
    })
    .addCase(getMaxPriceOfCamerasFiltered, (state, action) => {
      state.maxPriceFiltered = action.payload;
    })
    .addCase(addCameraToBasket, (state, action) => {
      const index = state.basket.findIndex(
        (element: { id: number; count: number }) => element.id === action.payload.id,
      );
      if (index < 0) {
        state.basket?.push(action.payload);
      } else {
        state.basket[index].count++;
      }
    })
    .addCase(changeBasketItemCount, (state, action) => {
      const index = state.basket.findIndex(
        (element: { id: number; count: number }) => element.id === action.payload.id,
      );
      state.basket[index].count = action.payload.count;
    })
    .addCase(deleteItem, (state, action) => {
      const index = state.basket.findIndex(
        (element: { id: number; count: number }) => element.id === action.payload.id,
      );
      state.basket.splice(index, 1);
    });
});

export { reducer };
